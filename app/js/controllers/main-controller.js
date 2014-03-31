(function() {

    'use strict';

    /*
     * Users Ctrl
     */
    angular.module('training.controllers').controller('UsersCtrl', ['$scope', '$sce', '$location', 'training.services.user', function($scope, $sce, $location, userService) {

        $scope.selectedIcon = "";
        $scope.icons = [
            {"value":"Gear","label":$sce.trustAsHtml("<i class=\"fa fa-gear\"></i> Gear")},
            {"value":"Globe","label":$sce.trustAsHtml("<i class=\"fa fa-globe\"></i> Globe")},
            {"value":"Heart","label":$sce.trustAsHtml("<i class=\"fa fa-heart\"></i> Heart")},
            {"value":"Camera","label":$sce.trustAsHtml("<i class=\"fa fa-camera\"></i> Camera")}];

        $scope.delete = function(index) {

            userService.deleteUser($scope.users[index].loginId, "loginId", function(err, status) {

                if(err) {

                    console.log("ERROR: delete user");
                }
                else {

                    console.log("INFO: deleted user");
                    $scope.users.splice(index, 1);
                }
            });
        };

        $scope.getUser = function() {

            var user = userService.getUser();
            if(user) {

                return user.firstName + " " + user.lastName;
            }
        };

        var user = userService.getUser();

        if(user && user.authToken) {

            userService.getUsers(function(err, users) {

                $scope.users = users;
                userService.saveLocalUsers(users);
            });
        }
        else {

            $location.path('/users/login');
        }
    }]);

    /*
     * User Edit Ctrl
     */
    angular.module('training.controllers').controller('UsersEditCtrl', ['$scope', '$routeParams', '$location','training.services.user', function($scope, $routeParams, $location, userService) {

        var userId = $routeParams.userId;
        $scope.user = userService.getLocalUser(userId);

        if(!$scope.user) {

            $location.path('/users');
        }

        $scope.save = function() {

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
            'password' : '',
            'userRole' : ''// 'admin', 'manager', 'user', ...
        };

        $scope.create = function() {

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
     * User Create Ctrl
     */
    angular.module('training.controllers').controller('UsersLoginCtrl', ['$scope', '$location', 'training.services.user', function($scope, $location,    userService) {

        $scope.user = {

            'loginId' : '',
            'password' : ''
        };

        $scope.message = "";

        $scope.login = function() {

            $scope.message = "";

            userService.loginUser($scope.user, function(err, status) {

                if(err) {

                    console.log("ERROR: login user");

                    $scope.message = "Authentication Error";
                }
                else {

                    console.log("INFO: Logged In User");

                    $location.path('/users');
                }
            });
        };
    }]);

    /*
     * Main Controller
     */
    angular.module('training.controllers').controller('MainCtrl', ['$scope', 'training.services.user', function($scope, userService) {

        userService.init();

    }]);
}());