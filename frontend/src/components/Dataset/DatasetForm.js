import React from "react";
import axios from "axios";

import {Button} from "react-bootstrap";

class DatasetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            features: "",
            targets: "",
            path: null,
            message: "",
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        
        if(name === "path") {
            value = event.target.files[0];
        }
        this.setState({
            ...this.state,
            [name]: value,
            showMessage: false
        });
    }

    async handleSubmit(event) {
        var msg = "Uploading, please wait";
        
        if(this.state.name === "")              msg = "Dataset name can't be empty";   
        else if(this.state.targets === "")      msg = "Target can't be empty";       
        else if(this.state.path === null)       msg = "File path can't be empty";
        
        let msgType = "secondary";
        if((this.state.name === "") || (this.state.targets === "") || (this.state.path === null))   msgType = "danger";

        await this.setState({
            ...this.state,
            showMessage: true,
            message: msg,
            messageType: msgType
        })
        if(msgType === "danger")    return;
        
        event.preventDefault();
        
        let featuresList = {}
        this.state.features.split(",").forEach((value) => {
            featuresList[value.trim()] = "";
        })

        let targetsList = {}
        this.state.targets.split(",").forEach((value) => {
            targetsList[value.trim()] = "";
        })
        
        await this.setState({
            ...this.state,
            features: JSON.stringify(featuresList),
            targets: JSON.stringify(targetsList),
        });

        let data = new FormData();
        for(let name in this.state) {
            data.append(name, this.state[name])
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/datasets/`, data, {
            headers: {
            "Content-Type":"multipart/form-data"
            } 
        })
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    ...this.state,
                    name: "",
                    features: "",
                    targets: "",
                    path: "",
                    messageType: "primary",
                    showMessage: true,
                    message: res.data,
                });
            }
            else {
                this.setState({
                    ...this.state,
                    messageType: "danger",
                    showMessage: true,
                    message: res.data,
                })
            }
        })
    }

    render() {
        return (
            <div className="row justify-content-center flex flex-col">
                <h1>Dataset Upload Form</h1>
                <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label forname="name">Dataset Name</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="name" id="name" aria-describedby="nameOfDataset" placeholder={this.state.name}/>
                        <small id="nameOfDataset" className="form-text text-muted">Enter name of the dataset</small>
                    </div>

                    <div className="form-group">
                        <label forname="features">Features</label>
                        <input type="text" onChange={this.handleChange}
                            className="form-control" name="features" id="features" aria-describedby="featuresOfDataset" placeholder={this.state.features}/>
                        <small id="featuresOfDataset" className="form-text text-muted">Enter comma separated features </small>
                    </div>

                    <div className="form-group">
                        <label forname="targets">Targets</label>
                        <input onChange={this.handleChange} type="text" className="form-control" name="targets" id="targets" aria-describedby="targetsOfDataset" placeholder={this.state.targets}/>
                        <small id="targetsOfDataset" className="form-text text-muted">Enter comma separated targets</small>
                    </div>

                    <div className="form-group">
                        <label forname="path">Dataset File</label>
                        <input onChange={this.handleChange} type="file"
                            className="form-control" name="path" id="path" aria-describedby="helpId" placeholder="path"/>
                        <small id="helpId" className="form-text text-muted">Upload dataset file</small>
                    </div>

                    {this.state.showMessage && (<p className={"text-" + this.state.messageType}>{this.state.message}</p>)}
                    
                    <Button variant={"primary"} type="submit"><i className="fas fa-upload fa-sm fa-fw"></i></Button>
                </form>
            </div>
        );
    }
}

export default DatasetForm;