import React from "react";
import axios from "axios";

class ModelDetailedAnalysis extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            model_name: props.model_name,
            dataset_id: props.dataset_id,
            // report: {},
            isDataLoaded: false
        }

        this.loadModelData = this.loadModelData.bind(this);
    }
    loadModelData() {
        axios.post(`${process.env.REACT_APP_API_URL}/api/analyze/`, this.state)
        .then(json => {
            console.log(json.data);
            this.setState({
                ...this.state,
                ...json.data,
                isDataLoaded: true
            });
        });

        console.log(this.state);
    }
    componentDidMount() {
        this.loadModelData();
    }
    render() {
        if(!this.state.isDataLoaded) 
            return (<p>Loading</p>)
        return (
            <div style={{ width: '20%' }}>
                <p>Model Name: {this.state.model_name}</p>
                <p>Dataset Name: {this.state.dataset}</p>
                <p>Accuracy Score: {this.state.accuracy}</p>
                <p>Precision Score: {this.state['Precision Score']}</p>
                <p>Recall Score: {this.state['Recall Score']}</p>
            </div>
        )
    }
};

export default ModelDetailedAnalysis;