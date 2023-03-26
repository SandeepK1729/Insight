from django.db import models
from django.conf import settings

models_list = [
    ("decisionTree"         , "Decision Tree Classifier"),
    ("knn"                  , "K-Nearest Neighbors Classifier"),
    ("logisticRegression"   , "Logistic Regression"),
    ("naiveBayes"           , "Gaussian Naive Bayes Classifier"),
    ("randomForest"         , "Random Forest Classifier"),
    ("svm"                  , "Support Vector Machine"),
]

class Dataset(models.Model):
    name        = models.CharField(max_length = 30, unique = True, blank = False)
    path        = models.FileField(upload_to = "datasets")
    features    = models.JSONField(default = dict)
    targets     = models.JSONField(default = dict)

    def __str__(self):
        return self.name

class ModelFile(models.Model):
    model_name  = models.CharField(
                    choices = models_list,
                    default = models_list[1][1],
                    max_length = 50,
                    null = False
                )
    dataset     = models.ForeignKey(Dataset, on_delete = models.CASCADE)
    model_obj   = models.FileField(upload_to = settings.MODEL_PATH_FIELD_DIRECTORY, null= True)
    # author      = models.CharField(max_length = 30)
    
    def __str__(self):
        return f"{self.model_name} trained on {self.dataset}"

        