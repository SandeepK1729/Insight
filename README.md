
# Insight

My First machine learning project. By using this app anyone can get benifit of machine learning.

Insight is a machine learning project that utilizes Django REST framework as its backend and ReactJS as its frontend. The goal of the project is to allow non-technical users to train and save machine learning models based on their own customized datasets, and to be able to use these models to predict outcomes based on current input.

Overall, Insight provides a user-friendly way for non-technical users to leverage the power of machine learning for their own purposes, without needing to have extensive knowledge of machine learning algorithms and techniques.

## Sub repos && Deployments

- [Frontend](https://github.com/SandeepK1729/Insight-frontend) - [https://insight-one.vercel.app](https://insight-one.vercel.app/)
- [Backend](https://github.com/SandeepK1729/Insight-backend)   - [https://insight-rnky.onrender.com](https://insight-rnky.onrender.com/api)

## Installation
To install and run Insight, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/insight.git
1. Install backend dependencies: pip install -r requirements.txt
1. Install frontend dependencies: cd frontend && npm install
1. Create .env file for backend in Backend/Insight directory: 
   ```python Copy code
      SECRET_KEY=<your-django-secret-key>
    ```
1. Create .env file for frontend in Frontend directory: 
   ```javascript Copy code
      REACT_APP_API_URL=http://127.0.0.1:8000
    ```
1. Change DATABASES in Insight/settings.py to LOCAL_DATABASE
1. Run the backend server: `python manage.py runserver`
1. a separate terminal, start the frontend server: `cd frontend && npm start`

The backend server should now be running at [http://localhost:8000/](http://localhost:8000/) and the frontend server should be running at http://localhost:3000/. You can access the Insight web application by visiting [http://localhost:3000/](http://localhost:3000/) in your web browser.

## Usage
Once you have the Insight web application running, you can begin uploading datasets, training models, and making predictions. Here are the main steps involved in using the application:

1. Upload a dataset: Navigate to the "Upload Dataset" page and upload a CSV file containing your dataset. The backend API will preprocess and split the dataset into training and testing sets.
1. Train a model: Navigate to the "Train Model" page and select a type of machine learning model to train. Customize the hyperparameters of the model as desired and begin training. Once the model has finished training, save it to the backend API.
1. Make predictions: Navigate to the "Make Predictions" page and input data for which you want a prediction. The backend API will apply the saved model to the input data and generate a prediction.

## Contributing

If you would like to contribute to Insight, please contribute frontend and backend individually. 

Please include a detailed description of your changes and why you think they would be valuable to Insight.

## Author

- [Konda Sandeep](https://www.github.com/SandeepK1729)

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
