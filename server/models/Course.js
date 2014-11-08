/**
 * Created by AntonyBaasan on 14-11-06.
 */

var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required'},
    featured: {type:Boolean , required:'{PATH} is required'},
    published: {type:Date, required:'{PATH} is required'},
    tags:[String]
});

//Creating model by Schema
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses(){
    Course.find({}).exec(function(err, collection){
        Course.create({title:"Title-1", featured:true, published:"", tags:[]});
    });
}

