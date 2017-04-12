(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.properties.v2', [])
		.factory('PropertyFactoryV2', Factory);

	Factory.$inject = ['$http', '$q', 'ApiConfig', 'KeyStorageService'];

	function Factory($http, $q, ApiConfig, KeyStorageService) {
		var factory = {
			findOne: _findOne,
			metadata: _metadata,
			search: _search
		};

		return factory;

		function _findOne(id, request){
			var deferred = $q.defer();
			
			$http.get(ApiConfig.v2.apiUrl + 'property(' + id + ')', {
				params: request,
				headers: {
					Authorization: 'Bearer ' + KeyStorageService.v2.getToken()
				}
			})
			.then(function (res){
				var listing = res.value;
				deferred.resolve(listing);
			}, function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _metadata() {
			var deferred = $q.defer();

			$http.get(ApiConfig.v2.apiUrl + 'property/$metadata', {
				headers: {
					Authorization: 'Bearer ' + KeyStorageService.v2.getToken()
				}
			}).then(function (res){
				deferred.resolve(res);
			}, function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _search(query) {
			var deferred = $q.defer();
			var encoded_query = encodeURIComponent(query);
			
			$http.get(ApiConfig.v2.apiUrl + 'property?' + query, {
				headers: {
					Accept: "odata.metadata=full",
					Authorization: 'Bearer ' + KeyStorageService.v2.getToken()
				}
			})
			.then(function (res){
				deferred.resolve(res);
			}, function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();