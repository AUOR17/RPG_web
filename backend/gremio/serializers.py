from rest_framework import serializers
from .models import Gremio, Aventurero

class GremioSerializaer(serializers.ModelSerializer):

    class Meta:
        model = Gremio
        fields = '__all__'

class AventureroSerializaer(serializers.ModelSerializer):

    class Meta:
        model = Aventurero
        fields = '__all__'