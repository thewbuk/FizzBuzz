import React, { Component } from 'react';
import './App.css';
import FizzBuzz from './FizzBuzz';
import Login from './Login';

class App extends Component {
  state = {
    isLoggedIn: false,
    token: ""
  }

  handleLogin = (token) => {
    this.setState({
      isLoggedIn: true,
      token: token
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <FizzBuzz token={this.state.token} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login onLogin={this.handleLogin} />
        </div>
      );
    }
  }
}

export default App;
