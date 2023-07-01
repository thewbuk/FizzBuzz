import React, { Component } from 'react';
import axios from 'axios';

class FizzBuzz extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/fizzbuzz')
            .then(response => {
                this.setState({ list: response.data });
            });
    }

    render() {
        const { list } = this.state;
        return (
            <ul>
                {list.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        );
    }
}

export default FizzBuzz;
