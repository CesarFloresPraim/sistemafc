import rest_framework_simplejwt
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.views import APIView

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class EmployeeListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.is_staff:
            dataSerialized = ReadEmployeeSerializer(
                Employee.objects.all(), many=True).data
        else:
            dataSerialized = EmployeeRhSerializer(
                Employee.objects.all(), many=True).data

        return JsonResponse(dataSerialized, safe=False)


class EmployeeForRegisterListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        dataSerialized = EmployeeForRegisterRhSerializer(
            Employee.objects.filter(isActive=True), many=True).data

        return JsonResponse(dataSerialized, safe=False)
