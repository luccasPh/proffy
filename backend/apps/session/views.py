from django.contrib.auth.hashers import check_password, make_password
from rest_framework.exceptions import ParseError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from . import serializers
from . import tasks
from apps.users.serializers import UserSerializer
from apps.users.models import User
from apps.session.utils import token_provider

# Create your views here.

class SignInView(APIView):
    def post(self, request: Request):
        serializer = serializers.SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(
            email=serializer.data.get('email')
        ).first()
        if not user:
            raise ParseError('E-mail ou senha incorretos, tente novamente')

        if not check_password(serializer.data.get('password'), user.hashed_password):
            raise ParseError('E-mail ou senha incorretos, tente novamente')

        if not user.is_activate:
            raise ParseError('Usuário ainda não ativo esta conta, por favor verifique seu email')

        token = token_provider.create_access_token(user)
        return Response({'token': token})

class SignUpView(APIView):
    def post(self, request: Request):
        serializer = serializers.SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user: User = serializer.save()
        token = token_provider.create_activation_token(str(user.id))
        tasks.email_activation_task.delay((token, user.name, user.email))
        return Response(status=status.HTTP_201_CREATED)


class ForgotView(APIView):
    def post(self, request: Request):
        serializer = serializers.ForgotSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.filter(email=serializer.data.get('email')).first()
        if not user:
            raise ParseError('Usuário não encontrado')
        
        token = token_provider.create_reset_token(str(user.id))
        tasks.email_reset_task.delay((token, user.name, user.email))
        return Response(status=status.HTTP_200_OK)

class ResetView(APIView):
    def put(self, request: Request):
        serializer = serializers.ResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id = token_provider.decode_token(serializer.data.get('token'), 'reset')
        user = User.objects.filter(id=user_id).first()
        if not user:
            raise ParseError('Usuário não encontrado')

        password = make_password(serializer.data.get('new_password'))
        User.objects.filter(id=user.id).update(hashed_password=password)
        return Response(status=status.HTTP_200_OK)

class ActivationView(APIView):
    def post(self, request: Request):
        serializer = serializers.ActivationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id: str = token_provider.decode_token(request.data.get('token'), 'activate')
        user = User.objects.filter(id=user_id).first()
        if not user:
            raise ParseError('Usuário não encontrador')

        if user.is_activate:
            raise ParseError('Usuário já ativo')

        User.objects.filter(id=user.id).update(is_activate=True)
        return Response(status=status.HTTP_200_OK)

