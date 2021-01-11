import uuid
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase
from django.urls import reverse

from apps.users.models import User
from .utils import token_provider

# Create your tests here.

class UserRegistrationAPITestView(APITestCase):
    url = reverse("session:signup")

    def test_invalid_password(self):
        """
        Test to verify that a post call with invalid password
        """
        user_data = {
            "name": "Test",
            "last_name": "User",
            "email": "teste@snow.com",
            "password": "password",
            "confirm_password": "invalid_password"
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(400, response.status_code)
    
    def test_user_registration(self):
        """
        Test to verify that a post call with user valid data
        """
        user_data = {
            "name": "Test",
            "last_name": "User",
            "email": "teste@snow.com",
            "password": "password",
            "confirm_password": "password"
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(201, response.status_code)

    def test_unique_email(self):
        """
        Test to verify that a post call with already exists email
        """
        user_data_1 = {
            "name": "Test",
            "last_name": "User",
            "email": "teste@snow.com",
            "password": "password",
            "confirm_password": "password"
        }
        response = self.client.post(self.url, user_data_1)
        self.assertEqual(201, response.status_code)
        user_data_2 = {
            "name": "Test",
            "last_name": "User",
            "email": "teste@snow.com",
            "password": "password",
            "confirm_password": "password"
        }
        response = self.client.post(self.url, user_data_2)
        self.assertEqual(400, response.status_code)

class UserActivationAPITestView(APITestCase):
    url = reverse("session:activation")

    def setUp(self):
        self.name = "John"
        self.last_name = "Snow"
        self.email = "john@ghost.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create(
            name=self.name,
            last_name=self.last_name,
            email=self.email,
            hashed_password=make_password(self.password)
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')

    def test_user_not_found(self):
        """
        Test to verify that a post call with not found user
        """
        token = token_provider.create_activation_token(str(uuid.uuid4()))
        activate_data = {
            "token": token,
        }
        response = self.client.post(self.url, activate_data)
        self.assertEqual(400, response.status_code)
    
    def test_already_active(self):
        """
        Test to verify that a post call with user already active
        """
        token = token_provider.create_activation_token(str(self.user.id))
        activate_data = {
            "token": token,
        }
        response = self.client.post(self.url, activate_data)
        self.assertEqual(200, response.status_code)

        response = self.client.post(self.url, activate_data)
        self.assertEqual(400, response.status_code)

    def test_user_activation(self):
        """
        Test to verify that a post call with valid data
        """
        token = token_provider.create_activation_token(str(self.user.id))
        activate_data = {
            "token": token,
        }
        response = self.client.post(self.url, activate_data)
        self.assertEqual(200, response.status_code)

class LoginAPITestView(APITestCase):
    url = reverse("session:signin")

    def setUp(self):
        self.name = "John"
        self.last_name = "Snow"
        self.email = "john@ghost.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create(
            name=self.name,
            last_name=self.last_name,
            email=self.email,
            hashed_password=make_password(self.password)
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')
        self.password_2 = "valar_morghulis"
        self.user_2 = User.objects.create(
            name="Aryan",
            last_name="Stark",
            email="arya@nymeria.com",
            hashed_password=make_password(self.password_2),
            is_activate=True
        )
    
    def test_invalid_email(self):
        """
        Test to verify that a post call with invalid email
        """
        login_data = {
            "email": "invalid@wrong.com",
	        "password": self.password
        }
        response = self.client.post(self.url, login_data)
        self.assertEqual(400, response.status_code)

    def test_invalid_password(self):
        """
        Test to verify that a post call with invalid password
        """
        login_data = {
            "email": self.email,
	        "password": 'invalid_password'
        }
        response = self.client.post(self.url, login_data)
        self.assertEqual(400, response.status_code)
    
    def test_user_not_active(self):
        """
        Test to verify that a post call with user not activate
        """
        login_data = {
            "email": self.email,
	        "password": self.password
        }
        response = self.client.post(self.url, login_data)
        self.assertEqual(400, response.status_code)
    
    def test_login(self):
        """
        Test to verify that a post call with valid data
        """
        login_data = {
            "email": self.user_2.email,
	        "password": self.password_2
        }
        response = self.client.post(self.url, login_data)
        self.assertEqual(200, response.status_code)

class ForgotAPITestView(APITestCase):
    url = reverse("session:forgot")

    def setUp(self):
        self.name = "John"
        self.last_name = "Snow"
        self.email = "john@ghost.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create(
            name=self.name,
            last_name=self.last_name,
            email=self.email,
            hashed_password=make_password(self.password),
            is_activate=True
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')
    
    def test_forgot_user_not_found(self):
        """
        Test to verify that a post call with user not found
        """
        forgot_data = {
            "email": "teste@teste.com",
        }
        response = self.client.post(self.url, forgot_data)
        self.assertEqual(400, response.status_code)

    def test_forgot(self):
        """
        Test to verify that a post call with valid data
        """
        forgot_data = {
            "email": self.email,
        }
        response = self.client.post(self.url, forgot_data)
        self.assertEqual(200, response.status_code)

class ResetAPITestView(APITestCase):
    url = reverse("session:reset")

    def setUp(self):
        self.name = "John"
        self.last_name = "Snow"
        self.email = "john@ghost.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create(
            name=self.name,
            last_name=self.last_name,
            email=self.email,
            hashed_password=make_password(self.password),
            is_activate=True
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')
    
    def test_reset_user_not_found(self):
        """
        Test to verify that a put call with user not found
        """
        token = token_provider.create_reset_token(str(uuid.uuid4()))
        reset_data = {
            "token": token,
            "new_password": "why_so_serious",
            "confirm_password": "why_so_serious"
        }
        response = self.client.put(self.url, reset_data)
        self.assertEqual(400, response.status_code)

    def test_invalid_password(self):
        """
        Test to verify that a put call with invalid password
        """
        token = token_provider.create_reset_token(str(self.user.id))
        reset_data = {
            "token": token,
            "new_password": "why_so_serious",
            "confirm_password": "invalid_password"
        }
        response = self.client.put(self.url, reset_data)
        self.assertEqual(400, response.status_code)

    def test_reset(self):
        """
        Test to verify that a put call with valid data
        """
        token = token_provider.create_reset_token(str(self.user.id))
        reset_data = {
            "token": token,
            "new_password": "why_so_serious",
            "confirm_password": "why_so_serious"
        }
        response = self.client.put(self.url, reset_data)
        self.assertEqual(200, response.status_code)
