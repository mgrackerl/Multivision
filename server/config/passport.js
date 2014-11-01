/**
 * Created by A on 10/31/2014.
 */

//Passport for Authentication
var passport = require('passport');
//Passport-Local for Authentication
var LocalStrategy = require('passport-local').Strategy;
//Bring express
var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function(){
    passport.use(new LocalStrategy (
        function(username, password, done){

            console.log('localStrategy: username - '+username+", password - "+password);

            User.findOne({username: username}).exec(function(err, user){
                console.log('User.findOne: user - '+user);
                if(user && user.authenticate(password))
                    return done(null, user);
                else
                    return done(null, false);
            });
        }
    ));

    passport.serializeUser(function(user, done){
        if(user){
            done(null, user.id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user)
        {
            done(err, user);
        });
    });
}