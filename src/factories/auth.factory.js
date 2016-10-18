(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.auth', [])
		.factory('RRAuthFactory', Factory);

	Factory.$inject = ['$http', '$q', '$window', 'ApiConfig', 'KeyStorageService'];

	function Factory($http, $q, $window, ApiConfig, KeyStorageService) {
		var factory = {
			getToken: _getToken
		};

		return factory;

		function _getToken(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: ApiConfig.baseUrl + 'api/oauth/access_token',
				config: {
					ignoreAuth: true
				},
				data: {
					client_id: ApiConfig.clientId,
					client_secret: ApiConfig.clientSecret,
					grant_type: 'client_credentials'
				}
			}).success(function (res){
				KeyStorageService.saveToken(res.access_token);
				
				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();