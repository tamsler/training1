
(function() {

    'use strict';

    /*
     * Creating training module
     */

    angular.module('training', ['ngRoute', 'training.controllers', 'training.services','training.directives']);

    angular.module('training').config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/users', {controller:'UsersCtrl', templateUrl:'partials/user-list.html'})
            .when('/users/create', {controller:'UsersCreateCtrl', templateUrl:'partials/user-create.html'} )
            .when('/users/edit/:userId', {controller:'UsersEditCtrl', templateUrl:'partials/user-edit.html'})
            .when('/users/login', {controller:'UsersLoginCtrl', templateUrl:'partials/user-login.html'})
            .otherwise({redirectTo:'/'});
    }]);

    /*
     * Create training controllers module
     */
    angular.module('training.controllers', []);

    /*
     * Create training services module
     */
    angular.module('training.services', []);

    /*
     * Create training directives
     */
    angular.module('training.directives', []);

}());