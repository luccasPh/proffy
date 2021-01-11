from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.exceptions import ParseError

from .models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    def validate_email(self, value: str):
        user = self.context.get('user')
        if User.objects.filter(email=value).exclude(id=user.id).exists():
            raise ParseError(detail="E-mail já registrado")
        return value
    
    def to_representation(self, instance: User):
        data = super(UserSerializer, self).to_representation(instance)
        if instance.avatar:
            data["avatar"] = instance.avatar.build_url()
        else:
            url = f"https://ui-avatars.com/api/?background=random&name={data.get('name')}+{data.get('last_name')}"
            data["avatar"] = url
        return data
    
    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'last_name',
            'email',
            'avatar',
            'whatsapp',
            'bio'
        )

class UserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, data: dict):
        password, confirm_password = data.get('new_password'), data.get('confirm_password')
        if password != confirm_password:
            raise ParseError(detail="A nova senha não combina")
        return data
