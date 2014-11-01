/**
 * Created by AntonyBaasan on 2014-10-15.
 * Node.js start file.
 */

//Bring express
var express = require('express');

//is process.env.NODE_ENV value is not set then set Default value (which is "development")
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log("env : "+env);

var app = express();

var config = require('./server/config/config')[env];

console.log('config: %j',config);

require('./server/config/express')(app, config);

require('./server/config/mongooseConfig')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

//Run the server
app.listen(config.port);
console.log("Listening on port "+config.port+" ...");


//We can install nodemon. The Nodemon - helps to auto apply change not restarting the node server.