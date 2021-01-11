from django.contrib.auth.hashers import check_password, make_password
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from cloudinary.uploader import destroy

from . import serializers
from .models import User

class UserView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request: Request):
        prefix = f"user:perfil:{request.user.id}"
        user_perfil = cache.get(prefix)
        if user_perfil:
            return Response(user_perfil)
        
        else:
            user = User.objects.filter(id=request.user.id).first()
            serializer = serializers.UserSerializer(user)
            cache.set(prefix, serializer.data)
            return Response(serializer.data)
    
    def put(self, request: Request):
        user = User.objects.filter(id=request.user.id).first()
        serializer = serializers.UserSerializer(
            user,
            data=request.data,
            context={'user': user},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        if 'avatar' in request.data and user.avatar:
            destroy(user.avatar.public_id)

        user = serializer.save()
        if hasattr(user, '_class'):
            cache.delete_pattern(f"class-list:{user._class.subject}:*")
        cache.delete(f"user:perfil:{request.user.id}")
        return Response(serializer.data)

class PasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request: Request):
        serializer = serializers.UserPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(id=request.user.id).first()
        if not check_password(serializer.data.get('old_password'), user.hashed_password):
            raise ParseError('Senhão antiga incorreta')

        User.objects.filter(id=user.id).update(
            hashed_password=make_password(serializer.data.get('new_password'))
        )
        return Response({'detail': 'Senha alterada com sucesso'})
