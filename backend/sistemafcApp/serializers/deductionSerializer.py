from ..models.deduction import DeductionType
from ..models.deduction import Deduction
from ..models.employee import Employee
from rest_framework import serializers


class WriteDeductionSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all())
    type = serializers.PrimaryKeyRelatedField(
        queryset=DeductionType.objects.all())
    class Meta:
        model = Deduction
        fields = '__all__'

class EmployeeFordEDeductionhSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name']

class ReadDeductionSerializer(serializers.ModelSerializer):
    employee = EmployeeFordEDeductionhSerializer()
    class Meta:
        model = Deduction
        fields = '__all__'
        depth = 1

class DeductionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeductionType
        fields = '__all__'
