from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SessionDataView(APIView):
    def get(self, request):
        num_visits = request.session.get('num_visits', 0)
        num_visits += 1
        request.session['num_visits'] = num_visits
        session_data = {key: value for key, value in request.session.items()}
        if session_data:
            return Response(session_data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No data found in session"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        for key, value in request.data.items():
            request.session[key] = value
        
        return Response({
            "message": "Data stored successfully",
            "stored_data": request.data
        }, status=status.HTTP_201_CREATED)
