from django.shortcuts   import render
from django.http        import JsonResponse

from django.core.files.base     import File, ContentFile

from rest_framework.decorators  import api_view
from rest_framework.response    import Response
from rest_framework.views       import APIView
from rest_framework             import viewsets

from .serializers   import DatasetSerializer, ModelFileSerializer
from .models        import Dataset, ModelFile
from .helper        import get_trained_model


@api_view(['GET'])
def apiOverview(request):
    print(request.get_full_path())
    return Response({
        'datasets'      : '/datasets',
        'models'        : '/models',
    })

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

class ModelFileView(APIView):
    def get(self, request):
        return Response(
            ModelFileSerializer(
                ModelFile.objects.all(),
                many = True
            ).data
        )
    
    def post(self, request):
        try:
            model_name  = request.data.get('model_name')
            dataset_id  = request.data.get('dataset')
            dataset     = Dataset.objects.get(id = dataset_id)

            # if ModelFile.objects.filter(model_name = model_name, dataset = dataset).count() > 0:
            #     return Response("Model already exist")
            
            modelFileRecord = ModelFile(
                                model_name = model_name,
                                dataset = dataset,
                                
                            )
            
            modelFileRecord.model_obj.save(
                f"{model_name} trained on {dataset.name} dataset - {dataset_id}.pkl",
                ContentFile(
                    get_trained_model(
                        model_name,
                        dataset_id,
                        request.data.get('knn_val', 0),
                    )
                )
            )

            modelFileRecord.save()

            response = "Successfully added dataset"
        except Exception as e:
            response = f"Unable to add dataset, due to Exception {e}"
        
        return Response(response)       

