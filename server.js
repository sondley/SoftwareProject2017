var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), //created model loading here
Test = require('./api/models/testModel'), //created model loading here
User=require('./api/models/usersModel'),
bodyParser = require('body-parser');
var connectMongoOnline='mongodb://leyloo:Sondley2318@ds259245.mlab.com:59245/sondley';
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(connectMongoOnline); 
//mongoose.connect('mongodb://localhost/Tododb'); 



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
var route = require('./api/routes/usersRoutes'); //importing route
var route1 = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route
route (app);
route1 (app);

app.listen(port);
//console.log(app);


console.log('todo list RESTful API server started on: ' + port);

