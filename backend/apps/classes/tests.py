import uuid, json
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APITestCase
from django.urls import reverse

from apps.users.models import User
from .models import Class, Connection, Schedule
from .utils.time import convert_minutes_to_hour

#Create your tests here.

class ClassAPITestView(APITestCase):
    url = reverse("classes:index")

    def setUp(self):
        self.user = User.objects.create(
            name="John",
            last_name="Snow",
            whatsapp="99999999",
            bio="A Wizard Is Never Late, Nor Is He Early. He Arrives Precisely When He Means To",
            email="john@ghost.com",
            hashed_password=make_password("you_know_nothing")
        )
        self.user_2 = User.objects.create(
            name="Harry",
            last_name="Potter",
            email="harry@hogwarts.com",
            hashed_password=make_password("mischief_managed")
        )
        self.token = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(self.token.access_token)}')
        self._class = Class.objects.create(
            subject="Spells",
            cost="29.99",
            user_id=self.user_2
        )
        self.schedules_1 = Schedule.objects.create(
            week_day=4,
            froM=450,
            to=870,
            class_id=self._class
        )
        self.schedules_2 = Schedule.objects.create(
            week_day=2,
            froM=450,
            to=870,
            class_id=self._class
        )
        
    
    def test_read_class(self):
        """
        Test to verify that a get call with class data
        """
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)

    def test_create_class(self):
        """
        Test to verify that a post call with valid data
        """
        class_data = {
            "subject": "Defence Against the Dark Arts",
            "cost": "39.99",
            "schedules": [
                {
                    "week_day": 2,
                    "froM": "08:00",
                    "to": "13:00"
                }
            ]
        }
        response = self.client.post(self.url,class_data, format='json')
        self.assertEqual(201, response.status_code)
    
    def test_update_class(self):
        """
        Test to verify that a put call with valid data
        """
        class_data ={
            "id": self._class.id,
            "subject": self._class.subject,
            "cost": "49.99",
            "schedules": [
                {
                    'id': self.schedules_1.id,
                    "week_day": self.schedules_1.week_day,
                    "froM": "14:00",
                    "to": "16:00"
                },
                {
                    "week_day": 3,
                    "froM": "14:00",
                    "to": "16:00"
                }

            ],
            "del_schedules": [str(self.schedules_2.id)]
        }
        response = self.client.put(self.url, class_data, format='json')
        self.assertEqual(200, response.status_code)
        self.assertEqual('49.99', response.data.get('cost'))

class ClassesListAPITestView(APITestCase):
    url = reverse("classes:list")

    def setUp(self):
        self.user = User.objects.create(
            name="John",
            last_name="Snow",
            whatsapp="99999999",
            bio="A Wizard Is Never Late, Nor Is He Early. He Arrives Precisely When He Means To",
            email="john@ghost.com",
            hashed_password=make_password("you_know_nothing")
        )
        self._class = Class.objects.create(
            subject="Spells",
            cost="29.99",
            user_id=self.user
        )
        self.schedules_1 = Schedule.objects.create(
            week_day=4,
            froM=450,
            to=870,
            class_id=self._class
        )
        self.schedules_2 = Schedule.objects.create(
            week_day=2,
            froM=450,
            to=870,
            class_id=self._class
        )
        
    
    def test_classes_list(self):
        """
        Test to verify that a get call with class data
        """
        query_params = {
            'subject': self._class.subject,
            'week_day': self.schedules_2.week_day,
            'schedule': convert_minutes_to_hour(self.schedules_2.froM + 10)
        }
        response = self.client.get(self.url, query_params)
        self.assertEqual(200, response.status_code)
        self.assertGreaterEqual(1, len(response.data))

class ConnectionAPITestView(APITestCase):
    url = reverse("classes:connection")

    def setUp(self):
        self.user = User.objects.create(
            name="John",
            last_name="Snow",
            whatsapp="99999999",
            bio="A Wizard Is Never Late, Nor Is He Early. He Arrives Precisely When He Means To",
            email="john@ghost.com",
            hashed_password=make_password("you_know_nothing")
        )
        self._class = Class.objects.create(
            subject="Spells",
            cost="29.99",
            user_id=self.user
        )
        self.schedules = Schedule.objects.create(
            week_day=4,
            froM=450,
            to=870,
            class_id=self._class
        )
        Connection.objects.create(
            user_id=self.user
        )
    
    def test_user_not_found(self):
        """
        Test to verify that a post call with user not found
        """
        connection_data = {
           'user_id': str(uuid.uuid4())
        }
        response = self.client.post(self.url, connection_data)
        self.assertEqual(400, response.status_code)
    
    def test_connection(self):
        """
        Test to verify that a post call with valid user
        """
        connection_data = {
           'user_id': str(self.user.id)
        }
        response = self.client.post(self.url, connection_data)
        self.assertEqual(201, response.status_code)

    def test_count_connections(self):
        """
        Test to verify that a get call with total connect
        """
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertGreaterEqual(response.data.get('total'), 0)

class ProffysAPITestView(APITestCase):
    url = reverse("classes:proffys")

    def setUp(self):
        self.user = User.objects.create(
            name="John",
            last_name="Snow",
            whatsapp="99999999",
            bio="A Wizard Is Never Late, Nor Is He Early. He Arrives Precisely When He Means To",
            email="john@ghost.com",
            hashed_password=make_password("you_know_nothing")
        )
        self._class = Class.objects.create(
            subject="Spells",
            cost="29.99",
            user_id=self.user
        )
        self.schedules = Schedule.objects.create(
            week_day=4,
            froM=450,
            to=870,
            class_id=self._class
        )
        Connection.objects.create(
            user_id=self.user
        )

    def test_count_connections(self):
        """
        Test to verify that a get call with total proffys
        """
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertGreaterEqual(response.data.get('total'), 0)

