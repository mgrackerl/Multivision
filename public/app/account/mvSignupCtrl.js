angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth) {


    $scope.signup = function() {
        console.log("signup 111");
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        console.log("signup 111");
        mvAuth.createNewUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }

})