from django.db import models
from .registerRH import RegisterDetailRH
# class StatusEnum(models.TextChoices):
#     CANCELLED = "Cancelado"
#     PREORDER = "Pre-Ordenado"
#     PENDING = 'Pendiente'
#     IN_PROGRESS = 'En progreso'
#     DELIVERED = 'Entregado'


class Comment(models.Model):
    registerDetail = models.ForeignKey(
        RegisterDetailRH, on_delete=models.CASCADE, related_name="comments_set")
    description = models.TextField(max_length=500)
    date = models.TextField(max_length=50)

    def __str__(self):
        return self.description
