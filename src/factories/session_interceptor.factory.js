(function() {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.session.interceptor', [])
        .factory('SessionInterceptorFactory', Factory);

    Factory.$inject = ['$injector', '$q'];

    function Factory($injector, $q) {
        console.log('constructor');
        var error_count = 0;
        var max_error_count = 5;

        var factory = {
            responseError: _responseError
        };

        return factory;

        /* --- PUBLIC METHODS --- */

        function _responseError(response) {
            console.log('the method');
            // Token has expired or some other Auth error
            if (response.status == 401) {
                console.log('increasing error count');
                error_count++;

                var AuthService = $injector.get('RRAuthFactory');
                var $http = $injector.get('$http');
                var deferred = $q.defer();

                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                AuthService.getToken().then(deferred.resolve, deferred.reject);

                if (error_count >= max_error_count) {
                    console.log('error_count was too great');
                    error_count = 0;
                    return $q.reject(response);
                } else {
                    // When the session recovered, make the same backend call again and chain the request
                    return deferred.promise.then(function() {
                        error_count = 0;
                        return $http(response.config);
                    });
                }
            }
            return $q.reject(response);
        }
    }
})();
