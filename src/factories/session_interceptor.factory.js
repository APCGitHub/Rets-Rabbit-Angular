(function() {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.session.interceptor', [])
        .factory('SessionInterceptor', Factory);

    Factory.$inject = ['$injector', '$q'];

    function Factory($injector, $q) {
        var factory = {
            responseError: _responseError
        };

        return factory;

        /* --- PUBLIC METHODS --- */

        function _responseError(response) {
        		// Token has expired or some other Auth error
                if (response.status == 401) {
                	console.log('Had a 401 error');
                    var AuthService = $injector.get('RRAuthFactory');
                    var $http = $injector.get('$http');
                    var deferred = $q.defer();

                    // Create a new session (recover the session)
                    // We use login method that logs the user in using the current credentials and
                    // returns a promise
                    AuthService.getToken().then(deferred.resolve, deferred.reject);

                    // When the session recovered, make the same backend call again and chain the request
                    return deferred.promise.then(function() {
                        return $http(response.config);
                    });
                }
                return $q.reject(response);
        }
    }
})();
