from django.urls import path, include

from .views import *

urlpatterns = [
    path("datasets/", ListDatasets.as_view(), name = "datasets"),
    # path('dataset/upload', datasetUploadView, name = "dataset upload view"),
]
