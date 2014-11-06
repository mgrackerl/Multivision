/**
 * Created by AntonyBaasan on 2014-10-15.
 */

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider,$locationProvider){
    var routeRoleChecks = {
        admin : {
            auth: function (mvAuth) { return mvAuth.authorizeCurrentUserForRoute('admin'); }
        },
        user : {
            auth: function (mvAuth) { return mvAuth.authorizeAuthenticatedUserForRoute(); }
        }
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false  //Fixes: error:nobase $location in HTML5 mode requires a tag to be present!
    });

    $routeProvider
        .when('/',
        {templateUrl: '/partials/main/main'
            , controller: 'mvMainController'})

        .when('/courses',
        {templateUrl: '/partials/account/signup'
            , controller: 'mvCourseListCtrl'})

        .when('/signup',
        {templateUrl: '/partials/account/signup'
            , controller: 'mvSignupCtrl'})

        .when('/profile',
        {templateUrl: '/partials/account/profile'
            , controller: 'mvProfileCtrl'
            , resolve: routeRoleChecks.user
        })

        .when('/admin/users',
        {templateUrl: '/partials/admin/user-list'
            , controller: 'mvUserListCtrl'
            , resolve: routeRoleChecks.admin
        });

});

angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized')
            $location.path("/")
    })
})

