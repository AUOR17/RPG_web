from django.db import models

class Guild(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # name VARCHAR(100) UNIQUE
    kingdom = models.CharField(max_length=100)
    max_capacity = models.IntegerField(default=50)

    def __str__(self):
        return f"{self.name} ({self.kingdom})"
    
class Adventurer(models.Model):

    CLASS_CHOICES = [
        ('MAGE', 'Mago'),
        ('WARRIOR', 'Guerrero'),
        ('ROGUE', 'Picaro'), 
        ('CLERIC', 'Clérigo'),
    ]

    STATUS_CHOICE = [
        ('ACTIVE', 'Activo'),
        ('MISSION', 'En Misión'),
        ('DEAD', 'Muerto en combate'),
    ]

    name = models.CharField(max_length=100)
    class_type = models.CharField(max_length=20, choices=CLASS_CHOICES)
    level = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='ACTIVE')

    guild = models.ForeignKey(Guild, related_name='adventurers', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} (Lv.{self.level}{self.get_class_type_display/()})"