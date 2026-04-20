from rest_framework import viewsets
from .models import Gremio, Aventurero
from .serializers import GremioSerializaer, AventureroSerializaer

# Create your views here.

class GremioViewSet(viewsets.ModelViewSet):
    queryset = Gremio.objetcs.all()
    serializer_class = GremioSerializaer

class AventureroViewSet(viewsets.ModelViewSet):
    queryset = Aventurero.objects-all()
    serializer_class = AventureroSerializaer
