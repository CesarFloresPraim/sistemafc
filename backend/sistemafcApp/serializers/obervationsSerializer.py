from ..models.observation import Observation
from rest_framework import serializers


class ObervationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'