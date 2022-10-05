import rest_framework_simplejwt
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.views import APIView

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class EmployeePerceptionListView(APIView):
    permission_classes = []

    def get(self, request):
        employeeInstances = Employee.objects.all().filter(isActive=True)
        employeeSerialized = ReadEmployeePerceptionsSerializer(employeeInstances, many=True).data
        return JsonResponse(employeeSerialized, safe=False)

class EmployeeForRegisterListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        dataSerialized = EmployeeForRegisterRhSerializer(
                Employee.objects.filter(isActive=True), many=True).data


        return JsonResponse(dataSerialized, safe=False)