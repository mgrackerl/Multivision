//MongoDB
var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    //listen event - Error
    db.on('error', console.error.bind(console, 'MongoDB connection error ...'));
    //listen event once - Open connection
    db.once('open', function callback(){
        console.log('Multivision DB opened.')
    });

    //Creating Schema for the Passport package(authentication)
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt:String,
        hashed_pwd:String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            console.log('userSchema.methods authenticate: passwordToMatch - '+passwordToMatch);

            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0)
        {
            console.log('New users added.');

            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'antony');//lets make password same as username
            User.create({firstName:"Antony", lastName:"Baasan", username:"antony", salt:salt, hashed_pwd: hash});
            hash = hashPwd(salt, 'anhaa');//lets make password same as username
            User.create({firstName:"Anhaa", lastName:"B", username:"anhaa", salt:salt, hashed_pwd: hash})
            hash = hashPwd(salt, 'annie');//lets make password same as username
            User.create({firstName:"Annie", lastName:"Batsaikha", username:"annie", salt:salt, hashed_pwd: hash})
        }
    })
}

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}