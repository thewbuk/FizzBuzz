import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: "",
        password: "",
        error: ""
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', {
        username: this.state.username,
        password: this.state.password
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        this.props.onLogin(response.data.access_token);
    })
    .catch(error => {
        this.setState({
            error: "Invalid username or password."
        });
    });
}


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                />
                <button type="submit">Log in</button>
            </form>
        );
    }
}

export default Login;
