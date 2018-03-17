// Dependencies

var express = require("express");
var router = express.Router();
var asana = require('asana');
var util = require('util');

var client = asana.Client.create().useAccessToken('0/bcddabca69ab6f3f02d7a924fe82a45b');
/* GET all projects. */
router.get('/', function(req, res, next) {
    client.users.me().then(function(user) {
        var userId = user.id;
        var workspaceId = user.workspaces[1].id;

        // findAll will return all the projects
        // Given userId and workspaceId
            return client.projects.findAll({
                assignee: userId,
                workspace: workspaceId,
                completed_since: 'now',
                opt_fields: 'name'
            }); 
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

module.exports = router;
