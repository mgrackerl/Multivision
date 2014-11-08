/**
 * Created by A on 10/26/2014.
 */

var auth = require('./auth');
var mongoose = require('mongoose')
var User = mongoose.model('User')

var users = require('../controllers/users')

module.exports = function(app){

    console.log("routes.js exported");

    // ----- API request handlers (start)
    //for partial views
    app.get('/api/users', auth.requireRole("admin"), users.getUsers);
    app.post('/api/users', users.createUser );
    app.put('/api/users', users.updateUser );

    app.put('/api/courses', courses.getCourses);

    //for partial views
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params[0]);
    });

    //login
    app.post('/login', auth.authenticate);

    //logout
    app.post('/logout', function(req, res){
        req.logout();//method came from passport
        res.end();
    });

    //If Api is unknown, the return 404 (otherwise we get default page)
    app.all('/api/*', function(req,res){
        res.send(404);
    })

    // ----- API request handlers (end)

    //set default route. Because SPA we need only one route.
    app.get('*', function(req, res){
        console.log("/* : "+req);
        console.log("req.user : %j"+req.user);

        res.render('index', {
            bootstrappedUser: req.user
        });//take from view engine folder.
    });

}