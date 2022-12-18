from ..models.smallBox import SmallBox, SmallBoxSplit
from ..models.registerRH import RegisterDetailRH
from rest_framework import serializers


class WriteSmallBoxSplitSerializer(serializers.ModelSerializer):
    smallBoxRegister = serializers.PrimaryKeyRelatedField(
        queryset=SmallBox.objects.all())

    class Meta:
        model = SmallBoxSplit
        fields = '__all__'


class ReadSmallBoxSplitSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallBoxSplit
        fields = '__all__'


class WriteSmallBoxSerializer(serializers.ModelSerializer):
    registerDetail = serializers.PrimaryKeyRelatedField(
        queryset=RegisterDetailRH.objects.all())

    class Meta:
        model = SmallBox
        fields = '__all__'


class ReadSmallBoxSerializer(serializers.ModelSerializer):
    smallBoxSplit = ReadSmallBoxSplitSerializer(
        source='smallboxsplit_set', many=True, read_only=True)

    class Meta:
        model = SmallBox
        fields = '__all__'
