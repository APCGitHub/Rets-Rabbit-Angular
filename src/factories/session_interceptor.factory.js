(function() {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.session.interceptor', [])
        .factory('SessionInterceptorFactory', Factory);

    Factory.$inject = ['$injector', '$q'];

    function Factory($injector, $q) {
        var error_count = 0;
        var max_error_count = 5;

        var factory = {
            responseError: _responseError
        };

        return factory;

        /* --- PUBLIC METHODS --- */

        function _responseError(response) {
            var config = response.hasOwnProperty('config') ? response.config : {};
            console.log(config);
            // Token has expired or some other Auth error
            if (!config.ignoreAuth && response.status == 401 && error_count < max_error_count) {
                error_count++;

                var AuthService = $injector.get('RRAuthFactory');
                var $http = $injector.get('$http');
                var deferred = $q.defer();

                //Attempt to get a new token
                AuthService.getToken().then(deferred.resolve, deferred.reject);
            
                // When the session recovered, make the same backend call again and chain the request
                // if the promise was resolved  
                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            error_count = 0;
            return $q.reject(response);
        }
    }
})();
