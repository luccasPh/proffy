import uuid
from django.db import models

from apps.users.models import User

class Class(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    subject = models.CharField(max_length=100)
    cost = models.CharField(max_length=20)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE, related_name='_class')

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.subject

class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    week_day = models.IntegerField()
    froM = models.IntegerField(db_column='from')
    to = models.IntegerField()
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE, related_name="schedules")

    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.id

class Connection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="connections")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    
    def __str__(self) -> str:
        return self.id
