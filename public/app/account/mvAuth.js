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
        }

    }
})
