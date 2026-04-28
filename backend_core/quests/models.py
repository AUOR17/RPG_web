from django.db import models
from django.conf import settings

class Quest(models.Model):

    class Status(models.TextChoices):
        TABERNA = 'TABERNA', 'Taberna (Nuevo)'
        EXPLORACION = 'EXPLORACION', 'Exploracion (En Proceso)'
        COMBATE = 'COMBATE', 'Combate (Negociacion)'
        TESORO = 'TESORO', 'Tesoro (Cerrado Ganado)'
        CEMENTERIO = 'CEMENTERIO' 'Cementerio (Cerrado Perdido)'

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    difficulty_level = models.IntegerField(default=1)
    potencial_reward = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.TABERNA)

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='quests'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.status}] {self.title}"