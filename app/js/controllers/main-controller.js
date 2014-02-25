(function() {

    'use strict';

    /*
     * Main Controller
     */
    angular.module('training.controllers').controller('MainCtrl', ['$scope', 'training.services.user', function($scope, userService) {

        $scope.users = [];

        $scope.newUser = {
            'userId': '',
            'firstName': '',
            'lastName': ''
        };

        $scope.updateUser = {};

        $scope.createUser = function() {

            //console.log("DEBUG: user : ", $scope.newUser);

            $scope.newUser.userId = $scope.newUser.firstName.charAt(0) + $scope.newUser.lastName.charAt(0);

            userService.createUser($scope.newUser, function(err, status) {

                console.log("DEBUG: status : ", status);
            });
        };

        $scope.getUsers = function() {

            userService.getUsers(function(err, users) {

                $scope.users = users;
            });
        };

        $scope.delete = function(index) {

            console.log("DEBUG: index : ", index);
            console.log("DEBUG: user : ", $scope.users[index]);
            userService.deleteUser($scope.users[index]._id, function(err, status) {

                if(err) {

                    console.log("ERROR: delete user");
                }
                else {

                    console.log("INFO: deleted user");
                    $scope.users.splice(index, 1);
                }
            });
        };

        $scope.populateUserUpdateForm = function(index) {

            console.log("DEBUG: index : ", index);
            console.log("DEBUG: user : " , $scope.users[index]);
            $scope.updateUser = $scope.users[index];
        };

        $scope.save = function() {

            console.log("DEBUG: Saving user : ", $scope.updateUser);

            userService.saveUser($scope.updateUser, function(err, status) {

                if(err) {

                    console.log("ERROR: save user");
                }
                else {

                    console.log("INFO: saved user");
                }
            });
        };
    }]);
}());