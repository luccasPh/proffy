from typing import Tuple
from celery import shared_task
from .utils.email_provider import send_reset_email, send_activation_email

@shared_task
def email_activation_task(params: Tuple):
    send_activation_email(params[0], params[1], params[2])
    
@shared_task
def email_reset_task(params: Tuple):
    send_reset_email(params[0], params[1], params[2])