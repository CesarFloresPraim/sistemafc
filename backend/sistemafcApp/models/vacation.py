from django.db import models

from .employee import Employee


class Vacation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.RESTRICT, related_name="employee_vacation_set")
    days = models.IntegerField(default=0, null=True, blank=True)
    note = models.TextField(max_length=500)
    fromDate = models.TextField(max_length=50)
    toDate = models.TextField(max_length=50)

    def __str__(self):
        return f"{self.employee.name} - {self.days} - {self.fromDate}"