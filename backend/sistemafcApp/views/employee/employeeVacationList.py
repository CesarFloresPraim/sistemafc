import rest_framework_simplejwt
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.views import APIView

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class EmployeeVacationListView(APIView):
    permission_classes = []

    def get(self, request):
        employeeInstances = Employee.objects.all().filter(isActive=True)
        employeeSerialized = ReadEmployeeVacationsSerializer(employeeInstances, many=True).data
        return JsonResponse(employeeSerialized, safe=False)
