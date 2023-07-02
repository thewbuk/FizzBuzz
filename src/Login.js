import React, { Component } from 'react';
import axios from 'axios';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    state = {
        username: "",
        password: "",
        error: "",
        testUsername: "test",
        testPassword: "password123",
        copiedUser: false,
        copiedPass: false
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCopy = (type) => {
        navigator.clipboard.writeText(this.state[type]);
        this.setState({ [`copied${type.charAt(0).toUpperCase() + type.slice(1)}`]: true });
        toast.success(`Copied ${type}!`, {
            position: toast.POSITION.TOP_RIGHT
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
                <ToastContainer />
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
                            <div className="py-5">
                                <div className="gap-4 flex-col">
                                    <div className='flex justify-between'>Username: {this.state.testUsername}
                                        <button onClick={() => this.handleCopy('testUsername')} className="focus:outline-none">
                                            {this.state.copiedUser ? <AiOutlineCheck className="text-green-500" /> : <AiOutlineCopy />}
                                        </button>
                                    </div>
                                    <div className='flex justify-between'>Password: {this.state.testPassword}
                                        <button onClick={() => this.handleCopy('testPassword')} className="focus:outline-none">
                                            {this.state.copiedPass ? <AiOutlineCheck className="text-green-500" /> : <AiOutlineCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
