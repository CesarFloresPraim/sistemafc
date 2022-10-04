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


class RegisterListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        registers = ReadRegisterListSerializer(
            RegisterRH.objects.all(), many=True).data

        return JsonResponse(registers, safe=False)
