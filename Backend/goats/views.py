from django.shortcuts import render
from .models import Goats
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import GoatSerializer

class GoatsListView(APIView):
    def get(self, request):
        goats = Goats.objects.all()
        serializer = GoatSerializer(goats, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GoatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

