from django.urls import path, include

from .views import *
from .routers import router

urlpatterns = [
    path('', include(router.urls)),
    path('models/', ModelFileView.as_view(), name = "models"),
    path('docs/', apiOverview, name = "overview"),
]
