(function() {

    'use strict';

    /*
     * Users Ctrl
     */
    angular.module('training.controllers').controller('UsersCtrl', ['$scope', 'training.services.user', function($scope, userService) {

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

        userService.getUsers(function(err, users) {

            $scope.users = users;
            userService.saveLocalUsers(users);
        });
    }]);

    /*
     * User Edit Ctrl
     */
    angular.module('training.controllers').controller('UsersEditCtrl', ['$scope', '$routeParams', '$location','training.services.user', function($scope, $routeParams, $location, userService) {

        var userId = $routeParams.userId;
        $scope.user = userService.getLocalUser(userId);

        $scope.save = function() {

            console.log("DEBUG: Saving user : ", $scope.user);

            userService.saveUser($scope.user, function(err, status) {

                if(err) {

                    console.log("ERROR: save user");
                }
                else {

                    console.log("INFO: saved user");
                    $location.path('/users');
                }
            });
        };
    }]);

    /*
     * User Create Ctrl
     */
    angular.module('training.controllers').controller('UsersCreateCtrl', ['$scope', 'training.services.user', function($scope, userService) {

        $scope.user = {

            'loginId' : '',
            'firstName' : '',
            'lastName' : '',
            'password' : ''
        };

        $scope.create = function() {

            console.log("DEBUG: Saving user : ", $scope.user);

            userService.createUser($scope.user, function(err, status) {

                if(err) {

                    console.log("ERROR: create user");
                }
                else {

                    console.log("INFO: Created User");
                }
            });
        };
    }]);

    /*
     * Main Controller
     */
    angular.module('training.controllers').controller('MainCtrl', ['$scope', 'training.services.user', function($scope, userService) {

    }]);
}());