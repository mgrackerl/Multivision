/**
 * Created by AntonyBaasan on 14-10-23.
 */
angular.module('app').controller('mvMainController', function($scope){
    $scope.courses = [
        {name:"Sample course 1", featured:true, published:new Date("2014-06-14")},
        {name:"Sample course 2", featured:false, published:new Date("2014-06-14")},
        {name:"Sample course 3", featured:true, published:new Date("2014-06-14")},
        {name:"Sample course 4", featured:true, published:new Date("2014-06-14")},
        {name:"Sample course 5", featured:false, published:new Date("2014-06-14")}
    ];
});
