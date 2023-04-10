import React from "react";
import Table from 'react-bootstrap/Table';
import DatasetForm from "./DatasetForm";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from 'react-bootstrap/Button';

import './DatasetsView.css';
import axios from "axios";

class Datasets extends React.Component {
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
		axios.get(`${process.env.REACT_APP_API_URL}/api/datasets/`)
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
		if (!this.state.DataisLoaded) 
			return (
				<div>
					<h1> Pleses wait some time.... </h1> 
				</div>
			);
		else
		return (
			<div className = "App">
				<h1> List of Datasets </h1> 
				<Button variant="primary" onClick={this.handleShow}>Upload Dataset</Button>
				<Popup 
					open={this.state.isPopupOpen}
					onClose={this.handleClose}
					position="bottom left"
					closeOnDocumentClick={true}
				>
					<DatasetForm/>
					<Button onClick={this.handleClose}><i className="fa fa-window-close" aria-hidden="true"></i></Button>
				</Popup>

				<Table hover striped bordered responsive>	
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Path</th>
						</tr>	
					</thead>
					<tbody>
					{
						this.state.items.map((item) => (
							<tr key = { item.id } >
								<td>{ item.id }</td>
								<td>{ item.name }</td>
								<td><a download={true} href={ process.env.REACT_APP_API_URL + item.path }><i className="fas fa-file-download"></i></a></td>
							</tr>	
						))
					}
					</tbody>				
				</Table>
			</div>
		);
	}
}

export default Datasets;
