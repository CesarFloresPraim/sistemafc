import rest_framework_simplejwt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from datetime import date

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class DeductionTypeView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, id):
        try:
            dataSerialized = DeductionTypeSerializer(
                DeductionType.objects.get(id=id)).data

        except ObjectDoesNotExist:
            return JsonResponse({"message": "No se encontró ese registro"}, status=404)

        return JsonResponse(dataSerialized, safe=False)

    def post(self, request):
        data = request.data
        serializer = DeductionTypeSerializer(data=data)

        return self.__getResponseAfterValidation(serializer)

    def put(self, request, id):
        try:
            object = DeductionType.objects.get(id=id)

        except ObjectDoesNotExist:
            return JsonResponse({"message": "No se encontró ese registro"}, status=404, safe=False)

        serializer = DeductionTypeSerializer(
            object, data=request.data, partial=True)

        return self.__getResponseAfterValidation(serializer)

    def __getResponseAfterValidation(self, serializer):
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return JsonResponse(serializer.data, safe=False)

        except BaseException as e:
            print(serializer.errors)
            return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                            status=400,
                            safe=False)
