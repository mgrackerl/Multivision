/**
 * Created by AntonyBaasan on 14-11-03.
 */
angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){
    $scope.users = mvUser.query();
})