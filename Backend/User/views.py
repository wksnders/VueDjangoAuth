from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.middleware.csrf import get_token

from .serializers import LoginSerializer,UserSerializer

class Login(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)
        return Response({"detail": "User not logged in."}, status=401)
    
    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        django_login(request, user)
        return Response(UserSerializer(request.user).data)
    
class Logout(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, format=None):
        django_logout(request)
        return Response({"detail": "Successfully logged out."}, status=200)
    
@ensure_csrf_cookie
def get_csrf_token(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response