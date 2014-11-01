/**
 * Created by AntonyBaasan on 14-10-30.
 */
var passport = require('passport');


exports.authenticate = function(req, res, next){
    console.dir("req.body: "+ req.body);

    var auth = passport.authenticate('local', function(err, user)
    {
        console.log("auth.js auth :: err : "+err);
        console.log("auth.js auth :: user : "+user);

        if(err) return next(err);
        if(!user) res.send({success: false});

        req.logIn(user, function(err){
            if(err) return next(err);

            res.send({success: true, user: user});
        });
    })
    auth(req, res, next);
}