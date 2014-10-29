/**
 * Created by AntonyBaasan on 2014-10-15.
 * Node.js start file.
 */

//Bring express
var express = require('express');
//Passport for Authentication
var passport = require('passport');
//Passport-Local for Authentication
var LocalStrategy = require('passport-local').Strategy;
//Bring express
var mongoose = require('mongoose');


//is process.env.NODE_ENV value is not set then set Default value (which is "development")
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log("env : "+env);

var app = express();

var config = require('./server/config/config')[env];

console.log('config: %j',config);

require('./server/config/express')(app, config);

require('./server/config/mongooseConfig')(config);

var User = mongoose.model('User');


passport.use(new LocalStrategy (
    function(username, password, done){

        console.log('localStrategy: username - '+username);

        User.findOne({userName: username}).exec(function(err, user){
            if(user)
                return done(null, user);
            else
                return done(null, false);
        });
    }
));

passport.serializeUser(function(user, done){
  if(user){
      done(null, user._id);
  }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
});

require('./server/config/routes')(app);


//Run the server

app.listen(config.port);
console.log("Listening on port "+config.port+" ...");


//We can install nodemon. The Nodemon - helps to auto apply change not restarting the node server.