// Dependencies
var express = require("express");
var router = express.Router();
var asana = require('asana');
var util = require('util');

var client = asana.Client.create().useAccessToken('0/bcddabca69ab6f3f02d7a924fe82a45b');
/* GET users listing. */

router.get('/', function(req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');

    // And insert something like this instead:
    client.users.me().then(function(user) {
    var userId = user.id;
    var workspaceId = user.workspaces[1].id;

    return client.tasks.findByProject("557126255085440");
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
