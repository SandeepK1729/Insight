import React from "react";
import axios from "axios";

class DatasetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            features: "",
            targets: "",
            path: "",
            message: "",
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        
        this.setState({
            ...this.state,
            [name]: value,
            showMessage: false
        });
    }

    handleSubmit(event) {
        this.setState({
            ...this.state,
            showMessage: true,
            message: "Uploading, please wait",
            messageType: "secondary"
        })
        event.preventDefault();
        
        let featuresList = {}
        this.state.features.split(",").forEach((value) => {
            featuresList[value.trim()] = "";
        })

        let targetsList = {}
        this.state.targets.split(",").forEach((value) => {
            targetsList[value.trim()] = "";
        })
        
        let data = {
            name: this.state.name,
            features: featuresList,
            targets : targetsList,
            path: this.state.path
        };
        

        axios.post(`/api/datasets/`, data)
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    ...this.state,
                    name: "",
                    features: "",
                    targets: "",
                    path: "",
                    messageType: "primary",
                })
            }
            else {
                this.setState({
                    ...this.state,
                    messageType: "danger",
                })
            }
            this.setState({
                ...this.state,
                showMessage: true,
                message: res.data,
            })
        })
    }

    render() {
        return (
            <div className="row justify-content-center flex flex-col">
                <h1>Dataset Upload Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div classname="form-group">
                        <label for="name">Dataset Name</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="name" id="name" aria-describedby="nameOfDataset" placeholder={this.state.name}/>
                        <small id="nameOfDataset" className="form-text text-muted">Enter name of the dataset</small>
                    </div>

                    <div className="form-group">
                        <label for="features">Features</label>
                        <input type="text" onChange={this.handleChange}
                            className="form-control" name="features" id="features" aria-describedby="featuresOfDataset" placeholder={this.state.features}/>
                        <small id="featuresOfDataset" className="form-text text-muted">Enter comma separated features </small>
                    </div>

                    <div className="form-group">
                        <label for="targets">Targets</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="targets" id="targets" aria-describedby="targetsOfDataset" placeholder={this.state.targets}/>
                        <small id="targetsOfDataset" className="form-text text-muted">Enter comma separated targets</small>
                    </div>

                    <div className="form-group">
                        <label for="path">Dataset File</label>
                        <input onChange={this.handleChange} type="file"
                            className="form-control" name="path" id="path" aria-describedby="helpId" placeholder="path"/>
                        <small id="helpId" className="form-text text-muted">Upload dataset file</small>
                    </div>

                    {this.state.showMessage && (<p className={"text-" + this.state.messageType}>{this.state.message}</p>)}
                    
                    <input type="submit" name="submit" value="Upload" onSubmit={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default DatasetForm;