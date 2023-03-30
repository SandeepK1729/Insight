from .views import DatasetViewSet # ModelFileViewSet

from rest_framework import routers

router = routers.DefaultRouter()

router.register("", DatasetViewSet, basename = "datasets")
# router.register("models", ModelFileViewSet, basename = "models")