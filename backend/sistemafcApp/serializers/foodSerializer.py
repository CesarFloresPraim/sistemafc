from ..models.food import Food
from ..models.registerRH import RegisterDetailRH
from rest_framework import serializers


class WriteFoodSerializer(serializers.ModelSerializer):
    registerDetail = serializers.PrimaryKeyRelatedField(queryset=RegisterDetailRH.objects.all())
    class Meta:
        model = Food
        fields = '__all__'

class ReadFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'