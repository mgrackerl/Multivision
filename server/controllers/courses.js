/**
 * Created by AntonyBaasan on 14-11-06.
 */

var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res)
{
    Course.find({}).exec(function(err, collection){
        res.send(collection);
    })
}

exports.getCoursesById = function(req, res)
{
    Course.findOne({_id:req.params.id}).exec(function(err, course){
        res.send(course);
    })
}
