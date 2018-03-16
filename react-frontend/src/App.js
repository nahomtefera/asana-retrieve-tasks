import React, { Component } from 'react';
import logo from './images/Logo-Horizontal-Color.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      tasks: []
    }

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(event) {
    let prevTasks = this.state.tasks;

    for(var i=0; i<prevTasks.length; i++) {
      if(prevTasks[i].id == event.target.id) {
        prevTasks.splice(i, 1);
      }
    }

    this.setState({
      tasks: prevTasks
    })
  }

  componentDidMount() {
    var allProjects = []; // We will store projects fetched
    var allTasks = [];  // We will store tasks fetched

    fetch('/projects')
        .then(res => res.json())
        .then(projects => projects.map(project=>{
          // We map through every project 
          // First we will push each project to our store
          allProjects.push(project);
          // Second we will fetch every task in each project
          fetch('/tasks/'+project.id)
          .then(res=>res.json())
          .then(tasks => tasks.map(task => {
            // Then we map through the tasks
            // Add a parent property to each task
            // And push them to our store
            task.parent = project.id;
            allTasks.push(task)
          }))
          .then(this.setState({
            // Now our state will have all projects
            // And tasks
            projects: allProjects,
            tasks: allTasks
          }))
        }));
  }

  render() {
    return (
      <div className="App">
        <header>
          
          <img className="asana-logo" src={logo}/>
          
        </header>

        <Router>
          <div>
            <ul className="projects-list">
              
              {this.state.projects.map(project=>
                <div  key={project.id}>
                    <Link to={`/${project.id}`}>
                      <li className="projects-list-item" id={project.id}> 
                        { project.name}
                      </li>  
                    </Link>

                    <Route path={`/${project.id}`} render={() => (

                      <div className="tasks-list-container">
                        <ul className="tasks-list">
                          {this.state.tasks.map(task=>{
                            if(task.parent === project.id) {
                              return <li key={task.id} className="tasks-list-items"> 
                                {task.name} 
                                <div className="rem-button" id={task.id} onClick={this.deleteTask}>X</div>
                              </li>
                            } else {
                              return
                            }
                          })}
                        </ul>
                      </div>
                      
                    )} />
                </div>
              )}
            </ul>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
