from ..models.registerRH import RegisterRH, RegisterDetailRH
from ..models.payroll import Payroll, RegisterPayroll

from .employeeSerializer import EmployeeForRegisterRhSerializer
from .registerRHSerializer import ReadRegisterDetailPayrollSerializer
from rest_framework import serializers


class WriteRegisterPayrollSerializer(serializers.ModelSerializer):
    payroll = serializers.PrimaryKeyRelatedField(queryset=Payroll.objects.all())
    registerDetail = serializers.PrimaryKeyRelatedField(queryset=RegisterDetailRH.objects.all())

    class Meta:
        model = RegisterPayroll
        fields = '__all__'


class ReadRegisterPayrollSerializer(serializers.ModelSerializer):
    registerDetail = ReadRegisterDetailPayrollSerializer()
    class Meta:
        model = RegisterPayroll
        exclude = ['payroll']
        depth = 3


class WritePayrollSerializer(serializers.ModelSerializer):
    registerRH = serializers.PrimaryKeyRelatedField(queryset=RegisterRH.objects.all())

    class Meta:
        model = Payroll
        fields = '__all__'


class ReadPayrollSerializer(serializers.ModelSerializer):
    payrollRegisters = ReadRegisterPayrollSerializer(
        source='payrolldetail_set', many=True, read_only=True)

    class Meta:
        model = Payroll
        fields = '__all__'
        depth = 2

class ReadPayrollListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = '__all__'
        depth = 1
