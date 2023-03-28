import React from "react";
import './DatasetsView.css'

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
		fetch("http://127.0.0.1:8000/api/datasets/")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
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
				<table>	
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
								<td>{ item.path }</td>
							</tr>	
						))
					}
				</table>
		</div>
	);
}
}

export default Datasets;
