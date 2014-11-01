/**
 * Created by A on 10/25/2014.
 */
angular.module('app').controller('mvNavBarLoginCtrl'
    , function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location){
    //set this param, we use it to show login form (in jade)
    $scope.identity = mvIdentity;

    //Service for login
    $scope.signin = function(username, password)
    {
        mvAuth.authenticateUser(username, password).then(function(success){
            if(success)
                mvNotifier.notify(username+" is successfully signed in!");
            else
                mvNotifier.notify("Username/Password combination incorrect!");
        });
    }

    $scope.signout = function()
    {
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";

            mvNotifier.notify("You have successfully signed out!");
            $location.path('/');
        });
    }
})
