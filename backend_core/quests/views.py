from rest_framework import viewsets
from .models import Quest
from .serializers import QuestSerializer

class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all().select_related('assigned_to')
    serializer_class = QuestSerializer

# Create your views here.
