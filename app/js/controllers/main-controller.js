(function() {

    'use strict';

    /*
     * Main Controller
     */
    angular.module('training.controllers').controller('MainCtrl', ['$scope', 'training.services.user', function($scope, userService) {

        $scope.users = [];

        $scope.getUsers = function() {

            userService.getUsers(function(err, users) {

                $scope.users = users;
            });
        };
    }]);
}());