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
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Login</h1> 
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <form onSubmit={this.handleSubmit}>
                                {this.state.error && <p className="text-red-500 text-xs mb-2">{this.state.error}</p>}
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    className="mb-5 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    className="mb-5 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900"
                                />
                                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white w-full py-2.5 rounded-md text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
