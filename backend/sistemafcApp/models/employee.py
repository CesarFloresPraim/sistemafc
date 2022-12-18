from email.policy import default
from django.db import models
from .department import Department


class Employee(models.Model):
    department = models.ForeignKey(Department, on_delete=models.RESTRICT)
    name = models.TextField(max_length=50)
    number = models.IntegerField(null=True, blank=True)
    phone = models.TextField(null=True, blank=True)
    isCurrent = models.BooleanField(default=True)
    daysOfWork = models.IntegerField(default=6)
    startDate = models.TextField(max_length=50, null=True, blank=True)
    salary = models.FloatField(default=0, null=True, blank=True)
    hasInflationBonus = models.BooleanField(default=False)
    savingsPerWeek = models.FloatField(default=0, null=True, blank=True)
    savingsAmount = models.FloatField(default=0, null=True, blank=True)
    retentionPerWeek = models.FloatField(default=0, null=True, blank=True)
    debtAmount = models.FloatField(default=0, null=True, blank=True)
    hasInfonavit = models.BooleanField(default=False)
    retentionInfonavit = models.FloatField(default=0, null=True, blank=True)
    infonavitAmount = models.FloatField(default=0, null=True, blank=True)
    endDate = models.TextField(max_length=50, null=True, blank=True)
    hasExtraHourFixed = models.BooleanField(default=False)
    extraHourPrice = models.FloatField(default=0, null=True, blank=True)
    puntualityPrice = models.FloatField(default=0, null=True, blank=True)
    attendancePrice = models.FloatField(default=0, null=True, blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.name
