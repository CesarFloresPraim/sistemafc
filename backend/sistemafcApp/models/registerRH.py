from django.db import models

from .employee import Employee


class AttendanceEnum(models.TextChoices):
    ASISTENCIA = "Asistencia"
    DOBLADA = "Doblada"
    FALTA_JUSTIFICADA = 'Falta justificada'
    FALTA_INJUSTIFICADA = 'Falta injustificada'
    DESCANSO = 'Descanso'


class RegisterRH(models.Model):
    fromDate = models.TextField(max_length=50)
    toDate = models.TextField(max_length=50)

    def __str__(self):
        return f"{self.fromDate} - {self.toDate}"


class RegisterDetailRH(models.Model):
    register = models.ForeignKey(
        RegisterRH, on_delete=models.CASCADE, related_name="registerdetailrh_set")
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="employee_set")
    puntuality = models.BooleanField(default=True)
    attendance = models.BooleanField(default=True)
    abscense = models.IntegerField(default=0)
    overtimeMinutes = models.IntegerField(default=0)
    lu = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    ma = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    mi = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    ju = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    vi = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    sa = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.ASISTENCIA)
    do = models.CharField(max_length=25,
                          choices=AttendanceEnum.choices,
                          default=AttendanceEnum.DESCANSO)

    def __str__(self):
        return f"{self.employee.name}"
