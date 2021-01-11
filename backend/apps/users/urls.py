from django.urls import path

from .views import UserView, PasswordView

app_name = 'users'

urlpatterns = [
    path('', UserView.as_view(), name="index"),
    path('/password', PasswordView.as_view(), name="password"),
]
