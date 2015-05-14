/**
 * Created by AntonyBaasan on 14-10-23.
 */
angular.module('app').controller('mvMainController', function($scope, mvCachedCourse){

    $scope.courses = mvCachedCourse.query();

});
