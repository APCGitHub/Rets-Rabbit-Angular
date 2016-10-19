(function() {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.session.interceptor', [])
        .factory('SessionInterceptorFactory', Factory);

    Factory.$inject = ['$injector', '$q', '$window', 'KeyStorageService'];

    function Factory($injector, $q, $window, KeyStorageService) {
        var error_count = 0;
        var max_error_count = 5;

        var factory = {
            responseError: _responseError
        };

        return factory;

        /* --- PUBLIC METHODS --- */

        function _responseError(response) {
            var config = response.config.config || {};

            // Token has expired or some other Auth error
            if (!config.ignoreAuth && response.status == 401 && error_count < max_error_count) {
                error_count++;

                var AuthService = $injector.get('RRAuthFactory');
                var $http = $injector.get('$http');
                var deferred = $q.defer();

                if(config.version == 1){
                    //Attempt to get a new token
                    AuthService.getTokenV1().then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                }

                if(config.version == 2){
                    //Attempt to get a new token
                    AuthService.getTokenV2().then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                }
            
                // When the session recovered, make the same backend call again and chain the request
                // if the promise was resolved  
                return deferred.promise.then(function() {
                    //TODO: fix this!! we need to check if v1 or v2
                    console.log(response.config);
                    var token = '';//KeyStorageService.getToken();

                    response.config.headers['Authorization'] = 'Bearer ' + token;

                    return $http(response.config);
                }, function (err) {
                    return $q.reject(response);
                });
            }
            error_count = 0;
            return $q.reject(response);
        }
    }
})();
