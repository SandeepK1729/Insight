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
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		axios.get("/api/models/")
			.then((json) => {
				this.setState({
					items: json.data,
					DataisLoaded: true
				});
			})
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
			<Popup 
				trigger={<Button variant="primary">Create Model</Button>} 
				position="bottom left"
				closeOnDocumentClick
			>
				<ModelForm/>
			</Popup>
			<Table hover striped bordered responsive>	
				<tr>
					<th>ID</th>
					<th>Model Name</th>
					<th>Model Path</th>
					<th>Dataset ID</th>
				</tr>					
				{
					items.map((item) => (
						<tr key = { item.id } >
							<td>{ item.id }</td>
							<td>{ item.model_name }</td>
							<td><a href={ item.model_obj }><i class="fas fa-file-download"></i></a></td>
							<td>{ item.dataset }</td>
						</tr>	
					))
				}
			</Table>
		</div>
	);
}
}

export default Models;
