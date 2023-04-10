import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from "./components/Pages/Homepage";
import NavBar from './components/Nav/NavBar';
import Sidebar from "./components/Bars/Sidebar";

import Datasets from './components/Dataset/DatasetsView';
import DatasetForm from './components/Dataset/DatasetForm';

import Models from './components/Model/ModelView';
import ModelForm from './components/Model/ModelCreationForm';

function App() {
	let [comp, setComp] = useState(<Homepage/>);
	let [width, setWidth] = useState(19);

	function componentDidMount() {
		onTagClick(comp);
	}
	function onTagClick(e) {
		let component_to_render;
		switch(e) {
			case 'Home':
				component_to_render = <Homepage/>;
				break;
			case 'Datasets List':
				component_to_render = <Datasets/>;
				break;
			case 'Upload Dataset':
				component_to_render = <DatasetForm/>;
				break;
			case 'Trained Models List':
				component_to_render = <Models/>;
				break;
			case 'Train Model':
				component_to_render = <ModelForm/>;
				break;
			default:
				component_to_render = null;
		}

		setComp(component_to_render);
	}

	function onWidthChange(e) {
		setWidth((width != 7) ? 7 : 20);
	}
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<NavBar/>
			<Sidebar onTagClick={onTagClick} onWidthChange={onWidthChange}/>
			<div className='componentClass' style={{ marginLeft: `${width}%`}}>
				
				{comp}
			</div>
				
		</BrowserRouter>
	);
}

export default App;
