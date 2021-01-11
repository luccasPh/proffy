import uuid
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase
from django.urls import reverse

from .models import User

# Create your tests here.

class UserReadUpdateAPITestView(APITestCase):
    url = reverse("users:index")

    def setUp(self):
        self.name = "Jon"
        self.last_name = "Snow"
        self.email = "jon@ghost.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create(
            name=self.name,
            last_name=self.last_name,
            email=self.email,
            hashed_password=make_password(self.password)
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')
        self.user_2 = User.objects.create(
            name="Aryan",
            last_name="Stark",
            email="arya@nymeria.com",
            hashed_password="valar_morghulis"
        )
    
    def test_read_user(self):
        """
        Test to verify that a get call with valid data
        """
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(self.email, response.data.get("email"))

    def test_update_unique_email(self):
        """
        Test to verify that a put call with already exists email
        """
        user_data = {
            "name": self.name,
            "last_name": self.last_name,
            "email": "arya@nymeria.com",
        }
        response = self.client.put(self.url, user_data)
        self.assertEqual(400, response.status_code)
    
    def test_user_update(self):
        """
        Test to verify that a put call with user valid data
        """
        user_data = {
            "name": self.name,
            "last_name": "Foo",
            "email": self.email,
        }
        response = self.client.put(self.url, user_data)
        self.assertEqual(200, response.status_code)
        self.assertEqual('Foo', response.data.get('last_name'))
    
class UserPasswordUpdateAPITestView(APITestCase):
    url = reverse("users:password")

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

    def test_update_invalid_password(self):
        """
        Test to verify that a put call with invalid password
        """
        password_data_1 = {
            "old_password": "invalid_password",
            "new_password": "password",
            "confirm_password": "password"
        }
        response = self.client.put(self.url, password_data_1)
        self.assertEqual(400, response.status_code)
        password_data_2 = {
            "old_password": self.password,
            "new_password": "password",
            "confirm_password": "invalid_password"
        }
        response = self.client.put(self.url, password_data_2)
        self.assertEqual(400, response.status_code)
    
    def test_update_password(self):
        """
        Test to verify that a put call with password valid data
        """
        password_data = {
            "old_password": self.password,
            "new_password": "new_password",
            "confirm_password": "new_password"
        }
        response = self.client.put(self.url, password_data)
        self.assertEqual(200, response.status_code)