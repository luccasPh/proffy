from django.urls import path

from .views import ClassView, ClassListView, ConnectionView, ProffysCountView

app_name = 'classes'

urlpatterns = [
    path('', ClassView.as_view(), name="index"),
    path('/list', ClassListView.as_view(), name="list"),
    path('/connection', ConnectionView.as_view(), name="connection"),
    path('/proffys', ProffysCountView.as_view(), name="proffys"),
]
