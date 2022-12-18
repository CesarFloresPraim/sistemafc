from email.policy import default
from django.db import models

from .employee import Employee
from .registerRH import RegisterDetailRH, RegisterRH

class Payroll(models.Model):
    registerRH = models.ForeignKey(
        RegisterRH, on_delete=models.RESTRICT, related_name="registerrh_set")
    inflationPercentage = models.FloatField(default=7.0)
    extraHourPrice = models.FloatField(default=50.0)

    def __str__(self):
        return f"{self.registerRH.fromDate} - {self.registerRH.toDate}"


class RegisterPayroll(models.Model):
    payroll = models.ForeignKey(
        Payroll, on_delete=models.RESTRICT, related_name="payrolldetail_set")
    registerDetail = models.OneToOneField(
        RegisterDetailRH, on_delete=models.RESTRICT, related_name="registerdetail_set")
    perceptionsAmount = models.FloatField(default=0)
    deductionsAmount = models.FloatField(default=0)
    cardAmount = models.FloatField(default=0)
    attendanceAmount = models.FloatField(default=0)
    salaryAmount = models.FloatField(default=0)
    vacationsAmount = models.FloatField(default=0)
    infonavitAmount = models.FloatField(default=0)
    vacationsAmount = models.FloatField(default=0)
    settlementAmount = models.FloatField(default=0)
    overtimeAmount = models.FloatField(default=0)

    def __str__(self):
        return f"{self.registerDetail.employee.name}"
