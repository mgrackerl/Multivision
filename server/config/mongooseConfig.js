//MongoDB
var mongoose = require('mongoose');

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
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0)
        {
            console.log('New users added.')
            User.create({firstName:"Antony", lastName:"Baasan", username:"antony"})
            User.create({firstName:"Anhaa", lastName:"B", username:"anhaa"})
            User.create({firstName:"Annie", lastName:"Batsaikha", username:"annie"})
        }
    })
}