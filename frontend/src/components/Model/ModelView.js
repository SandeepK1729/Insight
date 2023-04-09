import React from "react";
import './ModelView.css'

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

import Popup from "reactjs-popup";

import ModelForm from "./ModelCreationForm";
import axios from "axios";

class Models extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
			isPopupOpen: false
		};

		this.handleClose = this.handleClose.bind(this);
		this.handleShow  = this.handleShow.bind(this);
		this.loadAllModels = this.loadAllModels.bind(this);
	}

	handleShow (e) {
		this.setState({...this.state, isPopupOpen: true});
	}
	handleClose(e) {
		this.loadAllModels();
		this.setState({...this.state, isPopupOpen: false});
	}

	loadAllModels() {
		axios.get(`${process.env.REACT_APP_API_URL}/api/models/`)
		.then((json) => {
			this.setState({
				items: json.data,
				DataisLoaded: true
			});
		});
	}
	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		this.loadAllModels();
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) 
			return (
				<div>
					<h1> Pleses wait some time.... </h1> 
				</div>
			);

		return (
		<div className = "App">
			<h1> Fetch data from an api in react </h1> 
			<Button variant="primary" onClick={this.handleShow}>Create Model</Button>
			<Popup 
				open={this.state.isPopupOpen}
				onClose={this.handleClose}
				position="bottom left"
				// modal nested
				closeOnDocumentClick={true}
			>
				<ModelForm/>
				<Button onClick={this.handleClose}><i className="fa fa-window-close" aria-hidden="true"></i></Button>
			</Popup>

			<Table hover striped bordered responsive>	
				<thead>
					<tr>
						<th>ID</th>
						<th>Model Name</th>
						<th>Model Path</th>
						<th>Dataset ID</th>
					</tr>					
				</thead>
				<tbody>
				{
					items.map((item) => (
						<tr key = { item.id } >
							<td>{ item.id }</td>
							<td>{ item.model_name }</td>
							<td><a href={ process.env.REACT_APP_API_URL + item.model_obj }><i className="fas fa-file-download"></i></a></td>
							<td>{ item.dataset }</td>
						</tr>	
					))
				}
				</tbody>
			</Table>
		</div>
	);
}
}

export default Models;
