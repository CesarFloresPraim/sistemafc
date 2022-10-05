from ..models.comment import Comment
from ..models.registerRH import RegisterDetailRH
from rest_framework import serializers


class WriteCommentSerializer(serializers.ModelSerializer):
    registerDetail = serializers.PrimaryKeyRelatedField(queryset=RegisterDetailRH.objects.all())
    class Meta:
        model = Comment
        fields = '__all__'


class ReadCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'