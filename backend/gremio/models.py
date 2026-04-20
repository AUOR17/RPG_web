from django.db import models

# Create your models here.

class Gremio(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    fundacion = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre
    
class Aventurero(models.Model):
    ESTADOS_KANBAN = [
        ('Disponible', 'Disponible'),
        ('En Misión', 'En Misión'),
        ('Enfermería', 'Enfermería'),
        ('Muerto', 'Muerto'),
    ]

    nombre = models.CharField(max_length=100)
    clase_rpg = models.CharField(max_length=50)  
    nivel = models.IntegerField(default=1)
    estado = models.CharField(
        max_length=20, 
        choices=ESTADOS_KANBAN, 
        default='Disponible'
    )
    gremio = models.ForeignKey(Gremio, on_delete=models.CASCADE, related_name='aventureros')

    def __str__(self):
        return f"[{self.estado}] {self.nombre} (Nvl {self.nivel})"