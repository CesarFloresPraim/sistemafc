from django.db import models

from .registerRH import RegisterDetailRH


class SmallBox(models.Model):
    registerDetail = models.ForeignKey(RegisterDetailRH, on_delete=models.CASCADE, related_name="smallbox_set")
    amount = models.FloatField(default=0, null=True, blank=True)
    comment = models.TextField(max_length=500, null=True, blank=True)
    date = models.TextField(max_length=50)


    def __str__(self):
        return f"${self.amount}"
