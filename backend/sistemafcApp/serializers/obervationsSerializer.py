from ..models.observations import Observations
from rest_framework import serializers


class ObervationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observations
        fields = '__all__'