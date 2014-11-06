/**
 * Created by AntonyBaasan on 14-10-30.
 */

angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return{
        authenticateUser : function(username, password){
            var dfd = $q.defer();

            $http.post('/login', {username: username, password: password}).then(function(response){
                if(response.data.success){
                    var user = new mvUser();
                    angular.extend(user, response.data.user);

                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else{
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },
        logoutUser : function(){
            var dfd = $q.defer();

            //we have to give a body (ext. {logout: true}), otherwise angular will turn it into GET (instead of POST)
            $http.post('/logout', {logout: true}).then(function(response){
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){
                if(mvIdentity.isAuthorized(role)){
                    return true;
                }
                else
                    return $q.reject('not authorized');
        },

        authorizeAuthenticatedUserForRoute: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            }
            else
                return $q.reject('not authorized');
        },

        createNewUser: function(newUserData){
            console.log("mvAuth.js createNewUser 111");
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            },function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser: function(newUserData){
            console.log('mvAuth.js updateCurrentUser 111');
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);

            console.log('mvAuth.js updateCurrentUser 222');

            clone.$update().then(function(){
                console.log('mvAuth.js updateCurrentUser 333');
                mvIdentity.currentUser = clone;
                dfd.resolve();
            },function(response){
                console.log('mvAuth.js updateCurrentUser 444');
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }

    }
})
