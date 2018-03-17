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
  // Function that will be called 
  // When the user wants to hide a task
  deleteTask(event) {
    // We create a array that will store
    // The tasks in the state
    let prevTasks = this.state.tasks;
    // We iterate through the tasks in the state
    // Check if id of the task selected matches
    // Any of the ids in the tasks in the state
    for(var i=0; i<prevTasks.length; i++) {
      if(prevTasks[i].id == event.target.id) {
        // Once we match ids we will remove that task
        // From our tasks array
        prevTasks.splice(i, 1);
      }
    }
    // We will set the state to match the updated array
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
        {/* Main logo, top left */}
        <header>          
          <a target="_blank" href="https://app.asana.com">
            <img className="asana-logo" src={logo}/>
          </a>
        </header>
        {/* 
          We start writting our app
          
        */}
        <Router>
          <div className="app-container">
            <h3 className="projects-title">
              <Link to="/">current projects </Link>
            </h3>
            {/* 
                The app will show every project
                In a list, once you click on a project
                It will display another list with tasks
            */}
            <ul className="projects-list">
              {/*
                We loop through the projects that 
                We have stored in the state
                And return a <Link> element with the name of the project
              */}
              {this.state.projects.map(project=>
                <div className="project-list-item-container" key={project.id}>
                    {/* 
                      Link elements will change the route
                      To localhost:xxxx/projectId
                    */}
                    <Link to={`/${project.id}`}>
                      <li className="projects-list-item" id={project.id}> 
                        { project.name}
                      </li>  
                    </Link>
                    {/* Routes will have a list with the tasks for each project*/}
                    <Route path={`/${project.id}`} render={() => (
                      <div className="tasks-list-container">
                        <ul className="tasks-list">
                          {/* 
                            We will map through every task stored in the satate
                            If the parent property of the task that we are mapping through
                            Matches the project ID then we will add it to a new route
                          */}
                          {this.state.tasks.map(task=>{
                            if(task.parent === project.id) {
                              return (
                                
                                <li key={task.id} className="tasks-list-items">
                                  {/* Clicking on task will open the task in Asana */}
                                  <div className="task-list-item-container">
                                    <a target="_blank" href={"https://app.asana.com/0/" + project.id + "/" + task.id}>{task.name} </a>
                                  </div>

                                  {/* Remove button will remove the task from the state */}
                                  <div className="rem-button" id={task.id} onClick={this.deleteTask}>X</div>
                                </li>
                              )
                            } else {
                              // If the project doesn't have task we won't add anything to the list
                              return
                            }
                          })}
                        </ul> 
                      </div> // tasks-list-container
                      
                    )} /> {/*Closing route*/}
                </div> //project-list-item-container 
              )}
            </ul>
          </div>  
        </Router> 

      </div> //app
    );
  }
}

export default App;
