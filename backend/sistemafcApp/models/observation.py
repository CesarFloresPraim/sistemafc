from django.db import models
from .employee import Employee
# class StatusEnum(models.TextChoices):
#     CANCELLED = "Cancelado"
#     PREORDER = "Pre-Ordenado"
#     PENDING = 'Pendiente'
#     IN_PROGRESS = 'En progreso'
#     DELIVERED = 'Entregado'


class Observation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="observations_set")
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.description
