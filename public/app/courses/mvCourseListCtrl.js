/**
 * Created by AntonyBaasan on 14-11-05.
 */
angular.module('app').controller("mvCourseListCtrl", function($scope, mvCachedCourse){
    $scope.courses = mvCachedCourse.query();

    $scope.sortOptions = [{value:"title", text: "Sort by Title"},{value:"published", text: "Sort by Published date"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});