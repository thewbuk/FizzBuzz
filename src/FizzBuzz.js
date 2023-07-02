import React, { Component } from 'react';
import axios from 'axios';

class FizzBuzz extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/fizzbuzz', {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        })
        .then(response => {
            this.setState({ list: response.data });
        });
    }

    render() {
        const { list } = this.state;
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
                <h1 className="text-4xl mb-4">FizzBuzz List</h1>
                <ul className="space-y-2">
                    {list.map((item, index) => 
                        <li key={index} className="py-2 px-4 bg-white shadow-md rounded-lg">
                            {item}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default FizzBuzz;
