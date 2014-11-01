/**
 * Created by A on 10/26/2014.
 */

var auth = require('./auth');

module.exports = function(app){

    console.log("routes.js exported");

    //===== Express Run
    //for partial views
    app.get('/partials/*', function(req, res){
        console.log("--- req.params : "+req.params[0]);
        res.render('../../public/app/' + req.params[0]);
    });

    //login
    app.post('/login', auth.authenticate);

    //set default route. Because SPA we need only one route.
    app.get('*', function(req, res){
        console.log("/* : "+req);
        res.render('index');//take from view engine folder.
    });

}