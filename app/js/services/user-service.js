(function() {

    'use strict';

    /*
     * API:
     *
     * getUsers : callback
     * createUser : Object e.g. {"firstName":"Thomas, "lastName":"Amsler}
     */
    angular.module('training.services').factory('training.services.user', ['$http', function($http) {

        var UserService = { };

        // API : getUsers
        UserService.getUsers = function(callback) {

            $http(
                {
                    "method" : "GET",
                    "url" : "/api/v1/users",
                    "cache" : false

                })
                .success(function(data, status, headers, config) {

                    callback(null, data);
                })
                .error(function(data, status, headers, config) {

                    callback(true, null);
                });
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
        }

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
        }

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

