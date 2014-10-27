/**
 * Created by A on 10/25/2014.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http){
    console.log("inside mvNavBarLoginCtrl");

    $scope.signin = function(username, password){
        $http.post('/login', {userName: username, password: password}).then(function(response){
            if(response.data.success){
                console.log(username +" is logged in");
            }
            else{
                console.log("Failed to log in!");
            }
        });
    }
})
