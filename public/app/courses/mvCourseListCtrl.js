/**
 * Created by AntonyBaasan on 14-11-05.
 */
angular.module('app').controller("mvCourseListCtrl", function($scope, mvCourse){
    $scope.courses = mvCourse.query();
});