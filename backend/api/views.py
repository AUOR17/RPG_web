from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Guild, Adventurer
from .serialzers import GuildSerializer, AdventurerSerializer

class GuildViewSet(viewsets.ModelViewSet):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer
    permission_classes = [IsAuthenticated]

class AdventurerViewSet(viewsets.ModelViewSet):
    queryset = Adventurer.objects.all()
    serializer_class = AdventurerSerializer
    permission_classes = [IsAuthenticated]
