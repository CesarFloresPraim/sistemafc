from django.db import models

from .employee import Employee

# class StatusEnum(models.TextChoices):
#     CANCELLED = "Cancelado"
#     PREORDER = "Pre-Ordenado"
#     PENDING = 'Pendiente'
#     IN_PROGRESS = 'En progreso'
#     DELIVERED = 'Entregado'


class SmallBox(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.RESTRICT)
    name = models.TextField(max_length=50)
    amount = models.FloatField(default=0, null=True, blank=True)
    note = models.TextField(max_length=500)
    date = models.TextField(max_length=50)


    def __str__(self):
        return f"${self.employee.name} - {self.name}"
