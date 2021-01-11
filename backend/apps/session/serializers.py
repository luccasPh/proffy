from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.exceptions import ParseError

from apps.users.models import User

class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()
    
    def validate_email(self, value: str):
        if User.objects.filter(email=value).exists():
            raise ParseError(detail="E-mail já registrado")

        return value
    
    def validate(self, data: dict):
        password, confirm_password = data.get('password'), data.get('confirm_password')
        if password != confirm_password:
            raise ParseError(detail="As senhas não combina")

        return data

    def create(self, validated_data: dict):
        password = validated_data.get('password')
        del validated_data['password']
        del validated_data['confirm_password']
        user: User = User.objects.create(
            **validated_data,
            hashed_password=make_password(password)
        )
        return user

    class Meta:
        model = User
        fields = (
            'name',
            'last_name',
            'email',
            'password',
            'confirm_password'
        )

class ForgotSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, data: dict):
        password, confirm_password = data.get('new_password'), data.get('confirm_password')
        if password != confirm_password:
            raise ParseError(detail="A nova senha não combina")
        return data

class ActivationSerializer(serializers.Serializer):
    token = serializers.CharField()
