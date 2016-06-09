(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.auth', [])
		.factory('AuthFactory', Factory);

	Factory.$inject = ['$http', '$q', '$window', 'ApiProvider'];

	function Factory($http, $q, $window, ApiProvider) {
		var factory = {
			getToken: _getToken
		};

		return factory;

		function _getToken(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: ApiProvider.baseUrl + 'api/oauth/access_token',
				data: {
					client_id: ApiProvider.clientId,
					client_secret: ApiProvider.clientSecret,
					grant_type: 'credentials'
				}
			}).success(function (res){
				var token = res.token;
				deferred.resolve(token);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();