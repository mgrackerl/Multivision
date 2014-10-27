/**
 * Created by A on 10/25/2014.
 */

//Bring express
var express = require('express');
//Use "Stylus" for css
var stylus = require('stylus');
//Logger
var morgan = require('morgan');

var cookieParser = require('cookie-parser')
var passport = require('passport')

module.exports = function(app, config) {
//Helper function to configure Stylus middleware
    function Compile(str, path) {
        return stylus(str).set('filename', path);
    }

    //===== Configurations
    //set view engine
    app.set('views', config.rootPath + "/server/views");
    app.set('view engine', 'jade');
    app.use(cookieParser);
    //Stylus for express
    app.use(stylus.middleware({
        src: config.rootPath + "/public",
        compile: Compile
    }));
    app.use(express.session({secret:'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());

    //sets directory for any public request. For example if request is "localhost/favicon.ico" then express will search favicon.ico inside "__dirname+public" folder
    app.use(express.static(config.rootPath + "/public"));

    //Turn on express logging. DUPRICATED: Use morgan
    //app.use(express.logger("dev"));
    app.use(morgan('combined'));
    //Turn on express body parser. This will used for some middlewares. DUPRICATED: need 'body-parser'
    //app.use(express.bodyParser());
}