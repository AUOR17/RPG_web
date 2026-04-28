from django.contrib import admin
from .models import Quest

@admin.register(Quest)
class QuestAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'difficulty_level', 'assigned_to')
    list_filter = ('status', 'difficulty_level')
    search_fields = ('title', 'description')
