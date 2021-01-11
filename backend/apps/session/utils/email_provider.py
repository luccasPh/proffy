from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.conf import settings

def send_reset_email(token: str, name: str, email: str):
    subject = '[Proffy] Redefinição de senha'
    link = f"{settings.FRONTEND_WEB_URL}/reset?token={token}"
    html_message = render_to_string('email/forgot_email.html', {
        'name': name, 
        'link': link
    })
    plain_message = strip_tags(html_message)
    from_email = f'From <{settings.FROM_EMAIL}>'
    to = email

    send_mail(subject, plain_message, from_email, [to], html_message=html_message)

def send_activation_email(token: str, name: str, email: str):
    subject = '[Proffy] Ativação de conta'
    link = f"{settings.FRONTEND_WEB_URL}/activation?token={token}"
    html_message = render_to_string('email/activation_email.html', {
        'name': name, 
        'link': link
    })
    plain_message = strip_tags(html_message)
    from_email = f'From <{settings.FROM_EMAIL}>'
    to = email

    send_mail(subject, plain_message, from_email, [to], html_message=html_message)