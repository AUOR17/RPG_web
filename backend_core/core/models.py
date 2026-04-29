from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        MAESTRO = 'MAESTRO', 'Maestro del Gremio (Admin)'
        GUERRERO = 'GUERRERO', 'Guerrero (Ventas)'
        MAGO = 'MAGO', 'Mago (Marketing)'
        PICARO = 'PICARO', 'Pícaro (Operaciones)'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GUERRERO)
    level = models.IntegerField(default=1)
    experience = models.IntegerField(default=0)
    gold = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.username} - Nivel {self.level} {self.role}"