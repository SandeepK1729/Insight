import React from "react";
import axios from "axios";

class ModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model_name: "",
            dataset_id: 0,
            datasets: [],
            models: [],
            knn_val: 2,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
		fetch("http://127.0.0.1:8000/api/supported-models/")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ...this.state,
                models: json
            });
        })

        fetch("http://127.0.0.1:8000/api/datasets/")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                ...this.state,
                datasets: json
            });
        })
	}

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        
        this.setState({
            ...this.state,
            [name]: value,
            showMessage: false,
        });
    }

    handleSubmit(event) {
        this.setState({
            ...this.state,
            showMessage: true,
            messageType: "secondary",
            message: "uploading, please wait"
        })
        event.preventDefault();

        let data = {
            model_name : this.state.model_name,
            dataset_id : this.state.dataset_id
        };

        axios.post(`http://127.0.0.1:8000/api/models/`, data)
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    ...this.state,
                    model_name: "",
                    dataset_id: "",
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
                <h1>Model Creation Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                      <label for="model_name">Selct Model</label>
                      <select required onChange={this.handleChange} class="form-control" name="model_name" id="model_name">
                        <option selected disabled>Select Model</option>
                        {
                            this.state.models.map(model => (
                                <option key={model.id} value={model.name}>{model.name}</option>
                            ))
                        }
                      </select>
                    </div>

                    {this.state.model_name === "K-Nearest Neighbors Classifier" && (<div>
                        <label for="customRange1" class="form-label">Select Neighbors for KNN : {this.state.knn_val}</label>
                        <input onChange={this.handleChange} type="range" defaultValue={2} class="form-range" id="knn_val" min="1" max="10" name="knn_val"/>
                    </div>)}

                    <div class="form-group">
                      <label for="dataset_id">Select Dataset</label>
                      <select required onChange={this.handleChange} class="form-control" name="dataset_id" id="dataset_id">
                        <option selected disabled>Select Dataset</option>
                        {
                            this.state.datasets.map(dataset => (
                                <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                            ))
                        }
                      </select>
                    </div>

                    {this.state.showMessage && (<p className={"text-" + this.state.messageType}>{this.state.message}</p>)}
                    
                    <input type="submit" name="submit" value="Upload" onSubmit={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default ModelForm;