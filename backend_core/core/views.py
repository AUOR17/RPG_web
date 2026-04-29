from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from core.permissions import EsMaestroDelGremio

User = get_user_model()

def set_jwt_cookies(response):

    if response.status_code == 200:
        acces_token = response.data.get('access')
        refresh_token = response.data.get('refresh')

        if acces_token:
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value=acces_token, 
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),
                httponly=True,
                samesite='Lax'
            )

        if refresh_token:
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                value=refresh_token, 
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),
                httponly=True,
                samesite='Lax'
            )

        response.data.pop('access', None)
        response.data.pop('refresh', None)
        response.data['message'] = "Login exitoso. Las llaves se encuentran en las cookies"

class CookieTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        set_jwt_cookies(response)
        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if refresh_token and 'refresh' not in request.data:
            request.data._mutable = True
            request.data['refresh'] = refresh_token
            request.data._mutable = False

        response = super().post(request, *args, **kwargs)
        set_jwt_cookies(response)
        return response
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class BovedaSecretaView(APIView):
    permission_classes = [EsMaestroDelGremio]

    def get(self,request):
        return Response({
            "mensaje": f"Bienvenido Grn Maestro {request.user.username}", 
            "tesoro unico": "Espada de Drácula +100"
        })