from django.shortcuts import render

from rest_framework.decorators  import api_view
from rest_framework.response    import Response
from rest_framework.views       import APIView

from django.http import JsonResponse

from .serializers import DatasetSerializer

from .models import Dataset

class ListDatasets(APIView):

    def get(self, request):
        return Response(
            DatasetSerializer(
                Dataset.objects.all(),
                many = True
            ).data
        )
    
    def post(self, request):
        dataset     = DatasetSerializer(data = request.data)


        if dataset.is_valid():
            dataset.save()
            response = "Successfully added dataset"
        else:
            response = "Unable to add dataset"
        
        return Response(response)