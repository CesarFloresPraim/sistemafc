from django.db import models

# class StatusEnum(models.TextChoices):
#     CANCELLED = "Cancelado"
#     PREORDER = "Pre-Ordenado"
#     PENDING = 'Pendiente'
#     IN_PROGRESS = 'En progreso'
#     DELIVERED = 'Entregado'


class Department(models.Model):
    name = models.TextField(max_length=50)

    def __str__(self):
        return self.name
