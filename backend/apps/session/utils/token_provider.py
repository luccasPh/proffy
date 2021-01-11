import jwt
from datetime import timedelta, datetime
from django.conf import settings
from rest_framework.exceptions import ParseError
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.models import User

def create_access_token(user: User):
    refresh: RefreshToken = RefreshToken.for_user(user)
    access_token = refresh.access_token
    access_token.set_exp(lifetime=timedelta(hours=24))
    return str(access_token)

def create_reset_token(user_id: str):
    data = {
        "user_id": user_id,
        "type": "reset",
        "exp": datetime.utcnow() + timedelta(minutes=60)
    }
    encoded_jwt = jwt.encode(data, settings.SECRET_KEY, algorithm='HS256')

    return encoded_jwt.decode("utf-8")

def create_activation_token(user_id: str):
    data = {
        "user_id": user_id,
        "type": "activate",
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    encoded_jwt = jwt.encode(data, settings.SECRET_KEY, algorithm='HS256')

    return encoded_jwt.decode("utf-8")

def decode_token(token: str, type: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithm='HS256')
        if payload['type'] != type:
            raise Exception
        return payload['user_id']
    except:
        raise ParseError('Token invalido')

