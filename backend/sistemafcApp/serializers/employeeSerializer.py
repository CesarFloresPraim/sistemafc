from ..models.employee import Employee
from ..models.department import Department

from ..serializers.perceptionSerializer import ReadPerceptionSerializer
from ..serializers.deductionSerializer import ReadDeductionSerializer
from ..serializers.vacationSerializer import ReadVacationSerializer

from rest_framework import serializers


class EmployeeSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all())

    class Meta:
        model = Employee
        fields = '__all__'
        depth = 1


class ReadEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        depth = 1


class EmployeeRhSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'number', 'daysOfWork',
                  'startDate', 'endDate', 'department', 'phone', 'isCurrent', 'isActive']
        depth = 1


class EmployeeForRegisterRhSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name']


class ReadEmployeePerceptionsSerializer(serializers.ModelSerializer):
    perceptions = ReadPerceptionSerializer(
        source='employee_perception_set', many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'isActive', 'perceptions']


class ReadEmployeeDeductionsSerializer(serializers.ModelSerializer):
    deductions = ReadDeductionSerializer(
        source='employee_deduction_set', many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'isActive', 'deductions']


class ReadEmployeeVacationsSerializer(serializers.ModelSerializer):
    vacations = ReadVacationSerializer(
        source='employee_vacation_set', many=True, read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'number', 'name', 'department',
                  'isActive', 'daysOfWork', 'vacations', 'startDate' ]
        depth = 1

class ReadEmployeePayrollSerializer(serializers.ModelSerializer):
    perceptions = ReadPerceptionSerializer(
        source='employee_perception_set', many=True, read_only=True)
    deductions = ReadDeductionSerializer(
        source='employee_deduction_set', many=True, read_only=True)
    vacations = ReadVacationSerializer(
        source='employee_vacation_set', many=True, read_only=True)
        
    class Meta:
        model = Employee
        fields = '__all__'
        depth = 1