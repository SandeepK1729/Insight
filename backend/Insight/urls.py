from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from core import urls as coreUrls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(coreUrls)),
]

if settings.DEBUG:
    # urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(
                    settings.MEDIA_URL,
                    document_root = settings.MEDIA_ROOT
                )

    urlpatterns += static(
                    settings.STATIC_URL,
                    document_root = settings.STATIC_ROOT
                )