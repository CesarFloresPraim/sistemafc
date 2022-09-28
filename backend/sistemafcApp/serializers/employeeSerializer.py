from ..models.employee import Employee
from ..models.department import Department
from rest_framework import serializers


class EmployeeSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    class Meta:
        model = Employee
        fields = '__all__'
        depth = 1


class EmployeeRhSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'number', 'daysOfWork',
                  'startDate', 'endDate', 'department', 'phone', 'isCurrent']
        depth = 1
