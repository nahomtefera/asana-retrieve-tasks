import React, { Component } from 'react';
import logo from './images/Logo-Horizontal-Color.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

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
        <Router>
          <div>
            <ul className="projects-list">
              
              {this.state.projects.map(project=>

                <li className="projects-list-item" id={project.id} key={project.id}> 
                
                  <Link to={`/${project.id}`}>{ project.name}</Link>
                  <Route path={`/${project.id}`} component={About} />

                </li>    

              )}

            </ul>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
