from django.urls import path

from .views import SignInView, SignUpView, ForgotView, ResetView, ActivationView

app_name = 'session'

urlpatterns = [
    path('signin', SignInView.as_view(), name="signin"),
    path('signup', SignUpView.as_view(), name="signup"),
    path('forgot', ForgotView.as_view(), name="forgot"),
    path('reset', ResetView.as_view(), name="reset"),
    path('activation', ActivationView.as_view(), name="activation"),
]