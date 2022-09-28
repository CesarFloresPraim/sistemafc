from pydoc import describe
from django.db import models

# class StatusEnum(models.TextChoices):
#     CANCELLED = "Cancelado"
#     PREORDER = "Pre-Ordenado"
#     PENDING = 'Pendiente'
#     IN_PROGRESS = 'En progreso'
#     DELIVERED = 'Entregado'


class Observations(models.Model):
    description = models.TextField(max_length=500)


    def __str__(self):
        return self.name
