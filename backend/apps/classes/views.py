from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.users.models import User
from .models import Class, Connection
from . import serializers


class ClassView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request: Request):
        prefix = f"user:class:{request.user.id}"
        user_class = cache.get(prefix)
        if user_class:
            return Response(user_class)
        
        else:
            _class = Class.objects.filter(user_id=request.user.id).first()
            if not _class:
                return Response({})
            serializer = serializers.ClassSerializer(_class)
            cache.set(prefix, serializer.data)
            return Response(serializer.data)

    def post(self, request: Request):
        user = User.objects.filter(id=request.user.id).first()
        serializer = serializers.ClassSerializer(
            data=request.data, context={'user': user}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cache.delete_pattern(f"class-list:{serializer.data.get('subject')}:*")
        return Response(status=status.HTTP_201_CREATED)

    def put(self, request: Request):
        _class = Class.objects.filter(id=request.data.get('id')).first()
        cache.delete_pattern(f"class-list:{_class.subject}:*")
        serializer = serializers.ClassSerializer(_class, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cache.delete( f"user:class:{request.user.id}")
        cache.delete_pattern(f"class-list:{serializer.data.get('subject')}:*")
        return Response(serializer.data)

class ClassListView(APIView):
    def get(self, request: Request):
        serializer = serializers.QueryParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        prefix = f"class-list:{serializer.data.get('subject')}:{serializer.data.get('week_day')}:{serializer.data.get('schedule')}"
        classes = cache.get(prefix)
        if classes:
            return Response(classes)

        else:
            classes = Class.objects.filter(
                    subject = serializer.data.get('subject'),
                    schedules__week_day = serializer.data.get('week_day'),
                    schedules__froM__lte = int(serializer.data.get('schedule')),
                    schedules__to__gt = int(serializer.data.get('schedule'))
                )
            serializer = serializers.ClassListSerializer(classes, many=True)
            cache.set(prefix, serializer.data)
            return Response(serializer.data)

class ConnectionView(APIView):
    def get(self, request: Request):
        total = Connection.objects.count()
        return Response({'total': total})

    def post(self, request: Request):
        user = User.objects.filter(id=request.data.get("user_id")).first()
        if not user or not user._class:
            raise ParseError("Usuário não encontrado", code="401")
        Connection.objects.create(user_id=user).save()

        return Response(status=status.HTTP_201_CREATED)

class ProffysCountView(APIView):
    def get(self, request: Request):
        total = Class.objects.count()
        return Response({'total': total})