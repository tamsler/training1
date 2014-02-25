(function() {

    'use strict';

    /*
     * Fist directive
     */
    angular.module('training.directives').directive('trainingHelloWorldDirective', function() {

        console.log("DEBUG: trainingHelloWorldDirective");
        return {

            templateUrl: "/docs/public/partials/hello.html",
            restrict: "E"
        };
    });
}());