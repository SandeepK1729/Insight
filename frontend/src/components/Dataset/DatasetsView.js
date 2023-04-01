import React from "react";
import Table from 'react-bootstrap/Table';
import DatasetForm from "./DatasetForm";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from 'react-bootstrap/Button';

import './DatasetsView.css'
import axios from "axios";

class Datasets extends React.Component {
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
		axios.get("/api/datasets/")
			.then((json) => {
				console.log(json.data);
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
				<h1> List of Datasets </h1> 
				<Popup 
					trigger={<Button variant="primary">Upload Dataset</Button>} 
					position="bottom left"
					closeOnDocumentClick
				>
					<DatasetForm/>
				</Popup>

				<Table hover striped bordered responsive>	
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Path</th>
					</tr>					
					{
						items.map((item) => (
							<tr key = { item.id } >
								<td>{ item.id }</td>
								<td>{ item.name }</td>
								<td><a download={true} href={ item.path }><i class="fas fa-file-download"></i></a></td>
							</tr>	
						))
					}
				</Table>
			</div>
		);
	}
}

export default Datasets;
