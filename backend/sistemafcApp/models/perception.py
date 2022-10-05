from django.db import models

from .employee import Employee

class PerceptionType(models.Model):
    name = models.TextField(max_length=50)

    def __str__(self):
        return f"{self.name}"

class Perception(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.RESTRICT, related_name="employee_perception_set")
    type = models.ForeignKey(PerceptionType, on_delete=models.RESTRICT)
    amount = models.FloatField(default=0, null=True, blank=True)
    note = models.TextField(max_length=500)
    creationDate = models.TextField(max_length=50)
    percentual = models.BooleanField(default=False)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.employee.name} - {self.type.name} - ${self.amount}"