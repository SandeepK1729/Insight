from django.db import models
from django.conf import settings

class Dataset(models.Model):
    name        = models.CharField(max_length = 30, unique = True, blank = False)
    path        = models.FileField(upload_to = "datasets")
    features    = models.JSONField()
    targets     = models.JSONField()

    def __str__(self):
        return self.name

class ModelFile(models.Model):
    model_name  = models.CharField(max_length = 30)
    dataset     = models.ForeignKey(Dataset, on_delete = models.CASCADE)
    path        = models.FilePathField(path = settings.FILE_PATH_FIELD_DIRECTORY)