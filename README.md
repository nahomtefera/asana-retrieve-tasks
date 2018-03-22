# My Asana Projects and Tasks 

App that connects to ASANA API and retrieves projects and tasks in your account.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Have node installed
```
If you don't have it yet, head to https://nodejs.org/en/ and you will find a button to download it in the main page. 

### Installing

// If you are downloading this app from a zip file you can skip this part 

First we will install the dependencies for the server, cd to 'react-express-backend' and type npm install.

Now we will install the front end dependencies. From ASANA_API cd to 'react-frontend' and type npm install.

### Start the App

Once all the depencies are installed we can start the app. Make sure that you don't have anything running at localhost:3000 and localhost:3001

We will start the express server first. Go to 'ASANA_API/react-express-backend' and type 'node ./bin/www', (if you have nodemon installed you can just type nodemon from 'react-express-backend' folder). It will start the server at localhost:3001

Now let's start react. Open a new terminal and cd to 'ASANA_API/react-frontend' and type npm start, and the app will start running at localhost:3000

### Changing the workspace

To retrieve tasks and projects from another account you need to have your access token ready. You will have to change the token in two places, first you have to go to 'ASANA_API/react-express-backend/app.js' and change paste the token on line 11. Then go to 'ASANA_API/react-express-backend/routes/project.js' and paste your access token in line 8

## Built With

* [Express]() - The web framework used
* [React]() - Front end Framework
* [Asana]() - Project managment application


