from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'level', 'gold')

    list_filter = ('role', 'level', 'is_staff')

    fieldsets = UserAdmin.fieldsets + (
        ('Atributos de Heroe', {
            'fields': ('role', 'level', 'experience', 'gold'),
        }),
    )