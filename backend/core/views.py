from django.shortcuts   import render
from django.http        import JsonResponse

from django.core.files.base     import File, ContentFile

from rest_framework.decorators  import api_view
from rest_framework.response    import Response
from rest_framework.views       import APIView
from rest_framework             import viewsets

from .serializers   import DatasetSerializer, ModelFileSerializer
from .models        import Dataset, ModelFile
from .helper        import get_trained_model, give_analysis_report


@api_view(['GET'])
def apiOverview(request):
    """
        List of API routes
    """
    host = request.get_host()
    return Response({
        'datasets'      : f"http://{host}/datasets",
        'models'        : f"http://{host}/models",
        'predict'       : f"http://{host}/predict",
        
    })

class DatasetViewSet(viewsets.ModelViewSet):
    """ 
        List of all Datasets available, and upload a dataset
    """
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

class ModelFileView(APIView):
    """
        List of all Models, or create a model and save into file
    """
    def get(self, request):
        """invokes when get request

        Args:
            request (user request): contains all data of client

        Returns:
            Response: list of all models
        """
        return Response(
            ModelFileSerializer(
                ModelFile.objects.all(),
                many = True
            ).data
        )
    
    def post(self, request):
        """invokes post request called used to create model

        Args:
            request (user request): contains client info

        Returns:
            Response: answer about creation of model
        """
        try:
            model_name  = request.data.get('model_name')
            dataset_id  = request.data.get('dataset_id')
            dataset     = Dataset.objects.get(id = dataset_id)

            if ModelFile.objects.filter(model_name = model_name, dataset = dataset).count() > 0:
                return Response("Model already exist")
            
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

class ModelResponseView(APIView):

    def get(self, request):
        try:
            model_name  = request.GET.get('model_name')
            dataset_id  = request.GET.get('dataset_id')
            dataset     = Dataset.objects.get(id = dataset_id)
            
            modelFileRecord = ModelFile.objects.get(model_name = model_name, dataset = dataset)

            res = {
                "model_name"    : modelFileRecord.model_name,
                "dataset"       : modelFileRecord.dataset.name,
                "model_path"    : modelFileRecord.model_obj.url,
                **give_analysis_report(
                    modelFileRecord.model_obj.open('rb'), 
                    dataset_id
                )
            }
                
        except Exception as e:
            return Response(f"Unable to find model, due to Exception {e}")   

        return Response(res)




