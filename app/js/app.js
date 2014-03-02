
(function() {

    'use strict';

    /*
     * Creating training module
     */

    angular.module('training', ['ngRoute', 'training.controllers', 'training.services','training.directives']);

    angular.module('training').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/users', {controller:'UsersCtrl', templateUrl:'partials/user-list.html'})
            .when('/users/edit/:userId', {controller:'UsersEditCtrl', templateUrl:'partials/user-edit.html'})
            .otherwise({
                redirectTo:'/'
            });

        //$locationProvider.html5Mode(true).hashPrefix('!');
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