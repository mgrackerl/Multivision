/**
 * Created by AntonyBaasan on 14-11-08.
 */
angular.module('app').factory("mvCachedCourse", function(mvCourse){
    var courseList;

    return{
        query : function(){
            if(!courseList){
                courseList = mvCourse.query();
            }

            return courseList;
        }
    }
})