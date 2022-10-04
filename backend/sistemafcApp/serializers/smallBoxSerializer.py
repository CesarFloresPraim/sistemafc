from ..models.smallBox import SmallBox
from ..models.registerRH import RegisterDetailRH
from rest_framework import serializers


class WriteSmallBoxSerializer(serializers.ModelSerializer):
    registerDetail = serializers.PrimaryKeyRelatedField(queryset=RegisterDetailRH.objects.all())
    class Meta:
        model = SmallBox
        fields = '__all__'


class ReadSmallBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallBox
        fields = '__all__'