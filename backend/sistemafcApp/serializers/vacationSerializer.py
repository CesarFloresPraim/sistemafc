from ..models.vacation import Vacation
from ..models.employee import Employee
from rest_framework import serializers


class WriteVacationSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all())

    class Meta:
        model = Vacation
        fields = '__all__'

class EmployeeForVacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name']

class ReadVacationSerializer(serializers.ModelSerializer):
    employee = EmployeeForVacationSerializer()
    class Meta:
        model = Vacation
        fields = '__all__'
        depth = 1

