from ..models.smallBox import SmallBox
from rest_framework import serializers


class SmallBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmallBox
        fields = '__all__'