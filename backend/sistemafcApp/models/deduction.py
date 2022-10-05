from email.policy import default
from django.db import models

from .employee import Employee

class DeductionType(models.Model):
    name = models.TextField(max_length=50)

    def __str__(self):
        return f"{self.name}"

class Deduction(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.RESTRICT, related_name="employee_deduction_set")
    type = models.ForeignKey(DeductionType, on_delete=models.RESTRICT)
    amount = models.FloatField(default=0, null=True, blank=True)
    note = models.TextField(max_length=500)
    creationDate = models.TextField(max_length=50)
    toPayNow = models.BooleanField(default=True)
    payed = models.BooleanField(default=False)
    #percentual = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.employee.name} - {self.type.name} - ${self.amount}"