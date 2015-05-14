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
        if (collection.length === 0) {
            Course.create({title: "Title-1 s;adj saoiyopupewjlk jhfdkjhd soduf", featured: true, published: "10/23/1990", tags: []});
            Course.create({title: "Title-2", featured: false, published: "12/23/2005", tags: []});
            Course.create({title: "Title-3", featured: true, published: "10/23/1995", tags: []});
            Course.create({title: "Title-4", featured: false, published: "8/20/2013", tags: []});
            Course.create({title: "Title-5", featured: true, published: "1/2/2013", tags: []});
            Course.create({title: "Title-6", featured: true, published: "9/9/4014", tags: []});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;