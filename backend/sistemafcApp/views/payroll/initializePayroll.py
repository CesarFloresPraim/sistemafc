import rest_framework_simplejwt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from datetime import date
from django.db import transaction

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class InitializePayrollView(APIView):
    permission_classes = []

    def post(self, request):
        try:
            with transaction.atomic():
                data = request.data
                payrollSerialized = WritePayrollSerializer(data=data)

                if payrollSerialized.is_valid(raise_exception=True):
                    payrollSerialized.save()

                registerRHInstance = RegisterRH.objects.get(
                    id=payrollSerialized.data['registerRH'])
                #registerRHInstance = RegisterRH.objects.get(id=84)

                registerRHSerializedData = ReadRegisterRHSerializer(
                    registerRHInstance).data

                for registersDetail in registerRHSerializedData['registersDetails']:
                    registerDetailInstance = RegisterDetailRH.objects.get(
                        id=registersDetail['id'])
                    registerPayrollDTO = {
                        "payroll": payrollSerialized.data["id"],
                        "registerDetail": registerDetailInstance.id
                    }
                    registerPayrollSerialized = WriteRegisterPayrollSerializer(
                        data=registerPayrollDTO)
                    if registerPayrollSerialized.is_valid(raise_exception=True):
                        registerPayrollSerialized.save()

                # return JsonResponse({'id': 11}, status=200)
                return JsonResponse({'id': payrollSerialized.data['id']}, status=200)

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
