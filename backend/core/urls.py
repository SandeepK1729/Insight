from django.urls import path, include

from .views import *
from .routers import router

urlpatterns = [
    path('', apiOverview, name = "documentation"),
    path('docs/', apiOverview, name = "documentation"),
    
    path('datasets/', include(router.urls)),
    path('datasets/<int:pk>', DatasetDetailView.as_view(), name = "dataset detail"),
    
    path('models/', ModelFileView.as_view(), name = "models"),
    path('models/<int:pk>', ModelFileDetailView.as_view(), name = "model detail"),

    path('predict/', ModelResponseView.as_view(), name = "predict"),

]
