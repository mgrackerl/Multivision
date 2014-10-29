/**
 * Created by AntonyBaasan on 14-10-29.
 */
angular.module('app').factory('mvIdentity', function(){
    return{
        currentUser: undefined,
        isAuthenticated:function(){
            return !!this.currentUser;
        }
    }
})
