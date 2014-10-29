/**
 * Created by A on 10/26/2014.
 */

var passport= require('passport');

module.exports = function(app){

    console.log("routes.js exported");

    //===== Express Run
    //for partial views
    app.get('/partials/*', function(req, res){
        console.log("--- req.params : "+req.params[0]);
        res.render('../../public/app/' + req.params[0]);
    });

    //login
    app.post('/login', function(req, res, next){
        console.dir("req.body: "+ req.body);

        var auth = passport.authenticate('local', function(err, user)
        {
            console.log("routes.js auth :: err : "+err);
            console.log("routes.js auth :: user : "+user);

            if(err) return next(err);
            if(!user) res.send({success: false});

            req.logIn(user, function(err){
                if(err) return next(err);

                res.send({success: true, user: user});
            });
        })
        auth(req, res, next);
    });


    //set default route. Because SPA we need only one route.
    app.get('*', function(req, res){
        console.log("/* : "+req);
        res.render('index');//take from view engine folder.
    });

}