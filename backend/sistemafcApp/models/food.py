from email.policy import default
from django.db import models

from .registerRH import RegisterDetailRH


class Food(models.Model):
    registerDetail = models.OneToOneField(RegisterDetailRH, on_delete=models.CASCADE, related_name="food_set")
    lu = models.BooleanField(default=True)
    ma = models.BooleanField(default=True)
    mi = models.BooleanField(default=True)
    ju = models.BooleanField(default=True)
    vi = models.BooleanField(default=True)

