from ..models.registerRH import RegisterRH, RegisterDetailRH
from ..models.employee import Employee
from rest_framework import serializers
from .employeeSerializer import EmployeeForRegisterRhSerializer
from .smallBoxSerializer import ReadSmallBoxSerializer
from .foodSerializer import ReadFoodSerializer, WriteFoodSerializer
from .commentSerializer import CommentSerializer
from ..models.food import Food

class WriteRegisterDetailRHSerializer(serializers.ModelSerializer):
    register = serializers.PrimaryKeyRelatedField(queryset=RegisterRH.objects.all())
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())

    class Meta:
        model = RegisterDetailRH
        fields = '__all__'


class ReadRegisterDetailRHSerializer(serializers.ModelSerializer):
    employee = EmployeeForRegisterRhSerializer()
    smallBox = ReadSmallBoxSerializer(
        source='smallbox_set', many=True, read_only=True)
    food = ReadFoodSerializer(
        source='food_set', read_only=True)
    comments = CommentSerializer(
        source='comments_set', many=True, read_only=True)
    class Meta:
        model = RegisterDetailRH
        fields = '__all__'
        depth = 2


class WriteRegisterRHSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterRH
        fields = '__all__'

class ReadRegisterRHSerializer(serializers.ModelSerializer):
    registersDetails = ReadRegisterDetailRHSerializer(
        source='registerdetailrh_set', many=True, read_only=True)

    class Meta:
        model = RegisterRH
        fields = '__all__'
        depth = 1

class ReadRegisterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterRH
        fields = '__all__'
