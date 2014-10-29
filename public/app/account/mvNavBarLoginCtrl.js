/**
 * Created by A on 10/25/2014.
 */
angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier){
    console.log("inside mvNavBarLoginCtrl");

    $scope.signin = function(username, password){

        console.log("Sign In button clicked");

        $http.post('/login', {username: username, password: password}).then(function(response){
            if(response.data.success){
                mvIdentity.currentUser = response.data.user
                mvNotifier.notify(username+" is successfully signed in!");
            }
            else{
                mvNotifier.notify("Username/Password combination incorrect!");
            }
        });

    }
})
