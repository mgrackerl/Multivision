//MongoDB
var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    //listen event - Error
    db.on('error', console.error.bind(console, 'MongoDB connection error ...'));
    //listen event once - Open connection
    db.once('open', function callback(){
        console.log('Multivision DB opened.')
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
}