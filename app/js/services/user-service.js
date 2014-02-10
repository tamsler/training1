(function() {

    'use strict';

    angular.module('training.services').factory('training.services.user', ['$http', function($http) {

        var UserService = { };

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

        return UserService;
    }]);
}());

