import rest_framework_simplejwt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from datetime import date

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class DeductionView(APIView):
    #authentication_classes = [rest_framework_simplejwt.authentication.JWTAuthentication]
    #permission_classes = [permissions.IsAuthenticated]

    # def get(self, request, id):
    #     try:
    #         dataSerialized = EmployeeSerializer(
    #             Employee.objects.get(id=id)).data

    #     except ObjectDoesNotExist:
    #         return JsonResponse({"message": "No se encontrĂ³ ese registro"}, status=404)

    #     return JsonResponse(dataSerialized, safe=False)

    def post(self, request):
        data = request.data
        serializer = WriteDeductionSerializer(data=data)

        return self.__getResponseAfterValidation(serializer)

    def put(self, request, id):
        print(request.data)

        try:
            object = Deduction.objects.get(id=id)

        except ObjectDoesNotExist:
            return JsonResponse({"message": "No se encontrĂ³ ese registro"}, status=404, safe=False)

        serializer = WriteDeductionSerializer(
            object, data=request.data, partial=True)

        return self.__getResponseAfterValidation(serializer)

    # def delete(self, request, id):
    #     try:
    #         object = Employee.objects.get(id=id)

    #     except ObjectDoesNotExist:
    #         return JsonResponse({"message": "No se encontrĂ³ ese registro"}, status=404)

    #     serializer = EmployeeSerializer(
    #             object, data={"isActive":False}, partial=True)

    #     return self.__getResponseAfterValidation(serializer)

    def __getResponseAfterValidation(self, serializer):
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return JsonResponse(serializer.data, safe=False)
        except BaseException as e:
            print(e)
            return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                                status=400,
                                safe=False)
