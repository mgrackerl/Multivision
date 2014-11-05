/**
 * Created by AntonyBaasan on 14-11-04.
 */

var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

//Creating Schema for the Passport package(authentication)
var userSchema = mongoose.Schema({
    firstName:  {type:String, required:'{PATH} is required!'},
    lastName:   {type:String, required:'{PATH} is required!'},
    username:   {
        type:String,
        required:'{PATH} is required!',
        unique:true
    },
    salt:       {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles:[String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        console.log('userSchema.methods authenticate: passwordToMatch - '+passwordToMatch);

        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            console.log('New users added.');

            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'antony');//lets make password same as username
            User.create({firstName: "Antony", lastName: "Baasan", username: "antony", salt: salt, hashed_pwd: hash, roles: ['admin']});
            hash = encrypt.hashPwd(salt, 'anhaa');//lets make password same as username
            User.create({firstName: "Anhaa", lastName: "B", username: "anhaa", salt: salt, hashed_pwd: hash, roles: []})
            hash = encrypt.hashPwd(salt, 'annie');//lets make password same as username
            User.create({firstName: "Annie", lastName: "Batsaikha", username: "annie", salt: salt, hashed_pwd: hash, roles: []})
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;
