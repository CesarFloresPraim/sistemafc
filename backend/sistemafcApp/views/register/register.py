from functools import partial
from django.forms import ValidationError
import rest_framework_simplejwt
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from datetime import date
from django.db import transaction

from sistemafcApp.models import *
from sistemafcApp.serializers import *


class RegisterRHView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, id):
        try:
            register = ReadRegisterRHSerializer(
                RegisterRH.objects.get(id=id)).data
        except ObjectDoesNotExist:
            return JsonResponse({"message": "No se encontró ese registro"}, status=404)

        return JsonResponse(register, safe=False)

    def put(self, request, id):
        try:
            with transaction.atomic():
                registerRhData = {
                    "fromDate": request.data["fromDate"],
                    "toDate": request.data["toDate"]
                }
                registerRhObject = RegisterRH.objects.get(
                    id=request.data['id'])
                registerRhSerialized = WriteRegisterRHSerializer(registerRhObject,
                                                                 data=registerRhData)
                if registerRhSerialized.is_valid(raise_exception=True):
                    registerRhSerialized.save()

                try:
                    for registerDetail in request.data['registersDetails']:
                        registerDetail['employee'] = registerDetail['employee']['id']
                        registerDetail['register'] = registerDetail['register']['id']

                        registerDetailObject = RegisterDetailRH(
                            id=registerDetail["id"])
                        registerDetailSerialized = WriteRegisterDetailRHSerializer(registerDetailObject,
                                                                                   data=registerDetail, partial=True)

                        if registerDetailSerialized.is_valid(raise_exception=True):
                            registerDetailSerialized.save()

                        #Save food, new if no id found
                        foodObject = Food.objects.get(
                            id=registerDetail['food']['id'])
                        foodSerialized = WriteFoodSerializer(
                            foodObject, registerDetail['food'])

                        if foodSerialized.is_valid(raise_exception=True):
                            foodSerialized.save()

                        
                        #Save small box, new if no id found
                        for smallBoxRecord in registerDetail['smallBox']:
                            try:
                                if "id" in smallBoxRecord:
                                    smallBoxObject = SmallBox.objects.get(
                                        id=smallBoxRecord['id'])
                                    smallBoxSerialized = WriteSmallBoxSerializer(
                                        smallBoxObject, data=smallBoxRecord, partial=True)
                                else:
                                    smallBoxSerialized = WriteSmallBoxSerializer(
                                        data=smallBoxRecord)

                                if smallBoxSerialized.is_valid(raise_exception=True):
                                    smallBoxSerialized.save()
                            except (ObjectDoesNotExist, ValidationError):
                                print(e)
                                return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                                                    status=400,
                                                    safe=False)
                        #Save comments, new if no id found
                        for commentRecord in registerDetail['comments']:
                            try:
                                if "id" in commentRecord:
                                    commentObject = Comment.objects.get(
                                        id=commentRecord['id'])
                                    commentSerialized = WriteCommentSerializer(
                                        commentObject, data=commentRecord, partial=True)
                                else:
                                    commentSerialized = WriteCommentSerializer(
                                        data=commentRecord)

                                if commentSerialized.is_valid(raise_exception=True):
                                    commentSerialized.save()
                            except (ObjectDoesNotExist, ValidationError):
                                print(e)
                                return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                                                    status=400,
                                                    safe=False)

                except (ObjectDoesNotExist, ValidationError, BaseException) as e:
                    print(e)
                    return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                                        status=400,
                                        safe=False)

        except BaseException as e:
            print(e)
            return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                                status=400,
                                safe=False)

        return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                            status=200,
                            safe=False)

    def __getResponseAfterValidation(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)

        print(serializer.errors)

        return JsonResponse({"message": "Los datos enviados son incorrectos o falta algun dato"},
                            status=400,
                            safe=False)
