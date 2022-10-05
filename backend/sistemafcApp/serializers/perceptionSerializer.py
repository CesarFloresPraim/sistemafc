from ..models.perception import PerceptionType
from ..models.perception import Perception
from ..models.employee import Employee
from rest_framework import serializers


class WritePerceptionSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all())
    type = serializers.PrimaryKeyRelatedField(
        queryset=PerceptionType.objects.all())
    class Meta:
        model = Perception
        fields = '__all__'

class EmployeeForPerceptionhSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name']

class ReadPerceptionSerializer(serializers.ModelSerializer):
    employee = EmployeeForPerceptionhSerializer()
    class Meta:
        model = Perception
        fields = '__all__'
        depth = 1

class PerceptionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerceptionType
        fields = '__all__'

