// Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var asana = require('asana');
var util = require('util');

// Asana API call and auth
var client = asana.Client.create().useAccessToken('0/bcddabca69ab6f3f02d7a924fe82a45b');

var index = require('./routes/index');
// Projects API call
var projects = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// Projects API
app.use('/projects', projects);

// Task API, will retrieve task by projectId
app.get('/tasks/asana/:projectId', function(req, res, next) {
  var data = req.params;

  client.users.me().then(function(user) {
    var userId = user.id;
    var workspaceId = user.workspaces[1].id;

    // findByProject Will return tasks
    // Given a project ID 
    return client.tasks.findByProject(data.projectId);
  })
  .then(function(response){
    return response.data;
  })
  .filter(function(task) {
    return task
  })
  .then(function(list) {
    console.log(util.inspect(list, {
        colors:true,
        depth:null
    }));

    res.send(list);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
