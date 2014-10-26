/**
 * Created by AntonyBaasan on 2014-10-15.
 * Node.js start file.
 */

//Bring express
var express = require('express');
//Use "Stylus" for css
var stylus = require('stylus');
//Logger
var morgan = require('morgan');
//MongoDB
var mongoose = require('mongoose');

//is process.env.NODE_ENV value is not set then set Default value (which is "development")
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log("env : "+env);

var app = express();

//Helper function to configure Stylus middleware
function Compile(str, path){
    return stylus(str).set('filename', path);

}

//===== Configurations
//set view engine
app.set('views', __dirname + "/server/views");
app.set('view engine', 'jade');
//Stylus for express
app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: Compile
}));
//sets directory for any public request. For example if request is "localhost/favicon.ico" then express will search favicon.ico inside "__dirname+public" folder
app.use(express.static(__dirname + "/public"));
//Turn on express logging. DUPRICATED: Use morgan
//app.use(express.logger("dev"));
app.use(morgan('combined'));
//Turn on express body parser. This will used for some middlewares. DUPRICATED: need 'body-parser'
//app.use(express.bodyParser());


//MongoDB configuration. multivision will be a database name (creates if not exists)
if(env === 'development') {
    mongoose.connect('mongodb://127.0.0.1/multivision');
    console.log('Multivision DB connect to - mongodb://127.0.0.1/multivision.')
}
else {
    mongoose.connect('mongodb://antony:multivision_passwd@localhost/multivision');//configuration for "AWS with Bitnami Mean Stack"
    console.log('Multivision DB connect to - mongodb://antony:multivision_passwd@localhost/multivision.')
}


//===== MongoDB Run
var db = mongoose.connection;
//listen event - Error
db.on('error', console.error.bind(console, 'MongoDB connection error ...'));
//listen event once - Open connection
db.once('open', function callback(){
    console.log('Multivision DB opened.')
});

/*
var messageSchema = mongoose.Schema({message: String});
var messageModel = mongoose.model('message', messageSchema);
var mongoMessage;
messageModel.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
    console.log('Multivision DB findOne returned:' +mongoMessage);
});
*/

//===== Express Run
//for partial views
app.get('/partials/*', function(req, res){
    console.log("--- req.params : "+req.params);
    res.render('partials/' + req.params);
});
//set default route. Because SPA we need only one route.
app.get('*', function(req, res){
    res.render('index');//take from view engine folder.
});

//Run the server

var port = 80;
if(env === 'development')
    var port = 8000;

app.listen(port);
console.log("Listening on port "+port+" ...");



//We can install nodemon. The Nodemon - helps to auto apply change not restarting the node server.