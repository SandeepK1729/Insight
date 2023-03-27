from rest_framework     import serializers

from .models            import Dataset, ModelFile

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = "__all__"

class ModelFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelFile 
        fields = "__all__"