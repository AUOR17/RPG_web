from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Quest

User = get_user_model()

class UserRPGSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'level']

class QuestSerializer(serializers.ModelSerializer):

    assigned_to_details = UserRPGSerializer(source='assigned_to', read_only=True)

    class Meta:
        model = Quest
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']