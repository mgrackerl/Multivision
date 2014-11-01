/**
 * Created by AntonyBaasan on 14-10-29.
 */
angular.module('app').factory('mvIdentity', function($window){
    var currentUser;
    if(!!$window.bootstrappedUserObject)
        currentUser = $window.bootstrappedUserObject;

    return{
        currentUser: currentUser,
        isAuthenticated:function(){
            return !!this.currentUser;
        }
    }
})
