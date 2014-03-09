(function() {

    'use strict';

    /*
     * API:
     *
     * getUsers : callback
     * createUser : Object e.g. {"firstName":"Thomas, "lastName":"Amsler}
     */
    angular.module('training.services').factory('training.services.user', ['$http', function($http) {

        var UserService = {

            'users' : [],
            'user' : {}
        };

        UserService.saveLocalUsers = function(users) {

            this.users = users;
        };

        UserService.getLocalUsers = function() {

            return this.users;
        };

        UserService.getUser = function() {

            return this.user;
        };

        UserService.init = function() {

            UserService.user = angular.fromJson(localStorage.getItem("user"));
        };

        UserService.getLocalUser = function(userId) {

            for(var i = 0; i < this.users.length; i++) {

                if(this.users[i]._id === userId) {

                    return this.users[i];
                }
            }
        };

        // API : getUsers
        UserService.getUsers = function(callback) {

            if(this.user.authToken) {

                $http(
                    {
                        "method" : "GET",
                        "url" : "/api/v1/users",
                        "headers" : {
                            "Authorization" : "Session " + this.user.authToken
                        },
                        "cache" : false

                    })
                    .success(function(data, status, headers, config) {

                        callback(null, data);
                    })
                    .error(function(data, status, headers, config) {

                        callback(true, null);
                    });
            }
            else {

                console.log("ERROR: User is not authenticated");
            }
        };


        // API createUser
        UserService.createUser = function(newUser, callback) {

            $http(
                {
                    "method" : "POST",
                    "url" : "/api/v1/users",
                    "data" : newUser
                })
                .success(function(data, status, headers, config) {

                    callback(false, status);
                })
                .error(function(data, status, headers, config) {

                    callback(true, status);
                });
        };

        // API loginUser
        UserService.loginUser = function(user, callback) {

            $http(
                {
                    "method" : "POST",
                    "url" : "/api/v1/users/login",
                    "data" : user
                })
                .success(function(data, status, headers, config) {

                    UserService.user = data;
                    localStorage.setItem("user", angular.toJson(data));
                    callback(false, status);
                })
                .error(function(data, status, headers, config) {

                    callback(true, status);
                });
        };

        // API saveUser
        UserService.saveUser = function(user, callback) {

            console.log("DEBUG: saveUser called : user : ", user);
            $http(
                {
                    "method" : "PUT",
                    "url" : "/api/v1/users",
                    "data" : user
                })
                .success(function(data, status, headers, config) {

                    callback(false, status);
                })
                .error(function(data, status, headers, config) {

                    callback(true, status);
                });
        };

        // API Delete User
        UserService.deleteUser = function(id, callback) {

            $http(
                {
                    "method" : "DELETE",
                    "url" : "/api/v1/users",
                    "params" : {
                        "objectId" : id
                    }
                })
                .success(function(data, status, headers, config) {

                    callback(false, status);
                })
                .error(function(data, status, headers, config) {

                    callback(true, status);
                });
        };

        return UserService;
    }]);

}());

