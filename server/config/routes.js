/**
 * Created by A on 10/26/2014.
 */

var auth = require('./auth');
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = function(app){

    console.log("routes.js exported");

    //for partial views
    app.get('/api/users'
        //, auth.requireApiLogin
        , auth.requireRole("admin")
        ,function(req, res)
    {

        console.log("--- api/users : "+req.params[0]);

        User.find({}).exec(function(err, collection){
            res.send(collection);
        })
    });

    //for partial views
    app.get('/partials/*', function(req, res){
        console.log("--- req.params : "+req.params[0]);
        res.render('../../public/app/' + req.params[0]);
    });

    //login
    app.post('/login', auth.authenticate);

    //logout
    app.post('/logout', function(req, res){
        console.log("---- /logout");
        //console.log('req: %j',req);
        req.logout();//method came from passport
        res.end();
    });

    //set default route. Because SPA we need only one route.
    app.get('*', function(req, res){
        console.log("/* : "+req);
        console.log("req.user : %j"+req.user);

        res.render('index', {
            bootstrappedUser: req.user
        });//take from view engine folder.
    });

}