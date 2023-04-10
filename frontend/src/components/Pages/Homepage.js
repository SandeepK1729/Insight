import { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";    
import './Homepage.css';

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiStatus: false,
            isDataloaded: false
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/`)
        .then(res => {
            this.setState({
                isDataloaded: true,
                apiStatus: (res.status === 200)
            });
        });

        axios.get(`${process.env.REACT_APP_API_URL}/api/models`).then(res => console.log("models list cache ready"));
        axios.get(`${process.env.REACT_APP_API_URL}/api/datasets`).then(res => console.log("datasets list cache ready"));
        
    }

    render() {
        if(!this.state.isDataloaded) 
            return (
                <div>
                    loading ....
                </div>
            )
        return (
            <>
                <h1>Hello, World</h1>
                <p>This application is supported by <Link to={process.env.REACT_APP_API_URL + `/api/`}>Insight API</Link></p>

                { this.state.apiStatus && (
                        <p className="text-secondary">API ready, you can continue your exploring</p>
                )}

                { !this.state.apiStatus && (
                        <p className="text-muted">Your API is getting ready, please wait for a while</p>
                )}

                
            </>
        )
    }
}

export default Homepage;