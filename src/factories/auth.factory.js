(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.auth', [])
		.factory('RRAuthFactory', Factory);

	Factory.$inject = ['$http', '$q', 'ApiConfig', 'KeyStorageService'];

	function Factory($http, $q, ApiConfig, KeyStorageService) {
		var factory = {
			getTokenV1: _getTokenV1,
			getTokenV2: _getTokenV2
		};

		return factory;

		function _getTokenV1(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: ApiConfig.v1.baseUrl + 'api/oauth/access_token',
				config: {
					ignoreAuth: true,
					version: 1
				},
				data: {
					client_id: ApiConfig.v1.clientId,
					client_secret: ApiConfig.v1.clientSecret,
					grant_type: 'client_credentials'
				}
			}).success(function (res){
				KeyStorageService.v1.saveToken(res.access_token);

				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _getTokenV2(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: ApiConfig.v2.baseUrl + 'api/oauth/access_token',
				config: {
					ignoreAuth: true,
					version: 2
				},
				data: {
					client_id: ApiConfig.v2.clientId,
					client_secret: ApiConfig.v2.clientSecret,
					grant_type: 'client_credentials'
				}
			}).success(function (res){
				KeyStorageService.v2.saveToken(res.access_token);

				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();