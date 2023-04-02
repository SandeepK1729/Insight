import './App.css';

import Homepage from "./components/Pages/Homepage";
import NavBar from './components/Nav/NavBar';

import Datasets from './components/Dataset/DatasetsView';
import DatasetForm from './components/Dataset/DatasetForm';

import Models from './components/Model/ModelView';
import ModelForm from './components/Model/ModelCreationForm';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<NavBar/>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage/>} />

					<Route path="/datasets" element={<Datasets />} />
					<Route path="/datasets/upload" element={<DatasetForm/>}/>

					<Route path="/models" element={<Models />} />
					<Route path="/models/create"  element={<ModelForm/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
