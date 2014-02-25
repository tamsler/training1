
(function() {

    'use strict';

    /*
     * Creating training module
     */
    angular.module('training', ['training.controllers', 'training.services','training.directives','ngRoute'])
        /*
         * Set up some routes.
         */
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller:'MainCtrl',
                    templateUrl:'partials/main-partial.html'
                })
                .otherwise({
                    redirectTo:'/'
                });
        });

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