from django.urls import path
from .views import GoatsListView

urlpatterns = [
    path('goats/', GoatsListView.as_view(), name='goats-list'),
]