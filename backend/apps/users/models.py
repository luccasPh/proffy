import uuid
from django.db import models
from cloudinary.models import CloudinaryField
from django.conf import settings


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    whatsapp = models.CharField(blank=True, null=True, max_length=11)
    bio = models.TextField(blank=True, null=True) 
    hashed_password = models.CharField(max_length=200)
    avatar = CloudinaryField('imagem', blank=True, null=True, folder=settings.CLOUDINARY_LOCAL_PATH)
    is_activate = models.BooleanField(default=False)
    reset = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
