import numpy    as np 
import pandas   as pd
import matplotlib.pyplot as plt

from seaborn                    import heatmap

from sklearn.linear_model       import LogisticRegression           # logistic regression for classification
from sklearn.naive_bayes        import GaussianNB                   # Gaussian Naive Bayes Classifier
from sklearn.tree               import DecisionTreeClassifier       # Decision Tree Classifier
from sklearn.neighbors          import KNeighborsClassifier         # K Nearest Neighbors Classifier
from sklearn.svm                import SVC                          # Support Vector Machine Classifier
from sklearn.ensemble           import AdaBoostClassifier           # Ensemble Technique i.e, Ada Boosting
from sklearn.ensemble           import RandomForestClassifier       # Ensemble Technique i.e, Random Forest

from sklearn.model_selection    import train_test_split
from sklearn.metrics            import accuracy_score, confusion_matrix, precision_score, recall_score 

from sklearn.datasets           import *

from pickle                     import load, dump

datasets_list = {
    "iris.csv"      : {
        "path"      : "datasets/diabetes.csv",
        "target"    : "Outcome",
    }
}

def give_analysis_report(model_name: str, dataset_name: str):
    """gives the report of model on analysis of dataset

    Args:
        model_name (str): name of the model
        dataset_name (str): name of the dataset

    Returns:
        dict: gives report of dictionary
    """
    
    features, target = get_dataset(dataset_name)
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size = 0.2, random_state = 109)
    
    model = get_model(model_name)
    model.fit(X_train, y_train)           # model training 

    y_pred = model.predict(X_test)        # making prediction
    
    res = {
        "title"                 : f"Classfication using {model_name} on {dataset_name}",
        "accuracy"              : f"{accuracy_score(y_test, y_pred)}",
        "Precision Score"       : f"{precision_score(y_test, y_pred, average = 'micro')}",
        "Recall Score"          : f"{recall_score(y_test, y_pred, average = 'micro')}",
    }
    
    # plt.title(f"Classfication using {model_name} on {dataset_name}")
    # heatmap(pd.DataFrame(confusion_matrix(y_test, y_pred)), annot = True)
    # plt.xlabel("Predicted Labels")
    # plt.ylabel("Actual Labels")
    # plt.savefig(f"Confusion Matrix of {model_name} on {dataset_name}.png")

    return res

def get_dataset(dataset_name: str):
    """returns the features and target columns of dataset

    Args:
        dataset_name (str): name of the dataset

    Returns:
        (pd.DataFrame, pd.DataFrame): tuple of features dataframe and target dataframe or series
    """

    dataset = datasets_list[dataset_name]
    df      = pd.read_csv(dataset['path'])

    y       = df[dataset['target']]
    X       = df.drop(
                dataset['target'],
                axis = 1
            )

    return (X, y)

def get_model(model_name, neighbors = 0):
    """
    get_model function

    Args:
        model_name (str): name of the model
        neighbors (int, optional): no of neighbours. Defaults to 0.

    Returns:
        model object: contains respective model object
    """

    models = {
        "svm"                   : SVC(),
        "decisionTree"          : GaussianNB(),
        "randomForest"          : RandomForestClassifier(n_estimators = 25),
        "naiveBayes"            : DecisionTreeClassifier(),
        "knn"                   : KNeighborsClassifier(n_neighbors = int(neighbors)),
        "logisticRegression"    : LogisticRegression(random_state = 0),
    }
    
    return models[model_name]

