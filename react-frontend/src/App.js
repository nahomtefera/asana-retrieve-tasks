import React, { Component } from 'react';
import logo from './images/Logo-Horizontal-Color.png';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/projects')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo}/>
        </header>

        <Router>
          
        </Router>

      </div>
    );
  }
}

export default App;
