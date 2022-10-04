from logging import raiseExceptions
import rest_framework_simplejwt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from datetime import date
from django.db import transaction

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class InitializeRegisterRHView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            with transaction.atomic():
                data = request.data
                serializerRh = WriteRegisterRHSerializer(data=data)

                if serializerRh.is_valid(raise_exception=True):
                    serializerRh.save()

                employeesQuerySet = Employee.objects.filter(isActive=True)
                #registersDetailData = []
                for employee in employeesQuerySet:
                    registerDetail = {
                        "register": serializerRh.data['id'],
                        "employee": employee.id,
                        # Not needed because model has default values
                        # "puntuality": True,
                        # "attendance": True,
                        # "abscense": 0,
                        # "overtimeMinutes": 0,
                        # "lu": "Asistencia",
                        # "ma": "Asistencia",
                        # "mi": "Asistencia",
                        # "ju": "Asistencia",
                        # "vi": "Asistencia",
                        # "sa": "Asistencia",
                        # "do": "Descanso",
                    }
                    registersDetailSerialized = WriteRegisterDetailRHSerializer(
                        data=registerDetail)
                    if (registersDetailSerialized.is_valid(raise_exception=True)):
                        registersDetailSerialized.save()
                        
                    foodDetails = {
                        "registerDetail": registersDetailSerialized.data['id']
                    }
                    foodDetailsSerializer = WriteFoodSerializer(
                        data=foodDetails)
                    if (foodDetailsSerializer.is_valid(raise_exception=True)):
                        foodDetailsSerializer.save()

                return JsonResponse({'id': serializerRh.data['id']}, status=200)

        except BaseException as e:
            print(e)
            return JsonResponse({"message": "Ocurrio algun error, contacte con el admin del sistema"},
                                status=400,
                                safe=False)

    def __getResponseAfterValidation(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)

        print(serializer.errors)

        return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                            status=400,
                            safe=False)
