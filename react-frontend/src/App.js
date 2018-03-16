import React, { Component } from 'react';
import logo from './images/Logo-Horizontal-Color.png';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';


class App extends Component {
  state = {projects: []}

  componentDidMount() {
    fetch('/projects')
      .then(res => res.json())
      .then(projects => this.setState({ projects }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo}/>
        </header>

        <ul className="projects-list">
          
          {this.state.projects.map(project=>
            <li className="projects-list-item" key={project.id}> {project.name} </li>    
          )}

        </ul>

      </div>
    );
  }
}

export default App;
