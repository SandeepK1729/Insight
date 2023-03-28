from django.urls import path, include

from .views import *
from .routers import router

urlpatterns = [
    path('', include(router.urls)),
    path('dataset/<int:pk>', DatasetDetailView.as_view(), name = "dataset detail"),
    path('models/', ModelFileView.as_view(), name = "models"),
    path('predict/', ModelResponseView.as_view(), name = "predict"),
    path('docs/', apiOverview, name = "documentation"),
]
