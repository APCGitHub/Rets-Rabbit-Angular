(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.auth', [])
		.factory('RRAuthFactory', Factory);

	Factory.$inject = ['$http', '$q', '$window', 'ApiConfig'];

	function Factory($http, $q, $window, ApiConfig) {
		var factory = {
			getToken: _getToken
		};

		return factory;

		function _getToken(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: ApiConfig.baseUrl + 'api/oauth/access_token',
				data: {
					client_id: ApiConfig.clientId,
					client_secret: ApiConfig.clientSecret,
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