from django.urls import path
from .views import SessionDataView

urlpatterns = [
    path('session/', SessionDataView.as_view(), name='session_data_view'),
]
