(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.properties', [])
		.factory('PropertyFactory', Factory);

	Factory.$inject = ['$http', '$q', '$window', 'ApiConfig', 'KeyStorageService'];

	function Factory($http, $q, $window, ApiConfig, KeyStorageService) {
		var factory = {
			findOne: _findOne,
			metadata: _metadata,
			search: _search
		};

		return factory;

		function _findOne(id, request){
			var deferred = $q.defer();
			
			$http.get(ApiConfig.apiUrl + 'property(' + id + ')', {
				params: request,
				headers: {
					Authorization: 'Bearer ' + KeyStorageService.getToken()
				}
			})
			.success(function (res){
				var listing = res.value;
				deferred.resolve(listing);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _metadata() {
			var deferred = $q.defer();

			$http.get(ApiConfig.apiUrl + 'property/$metadata', {
				headers: {
					Authorization: 'Bearer ' + KeyStorageService.getToken()
				}
			}).success(function (res){
				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _search(query) {
			var deferred = $q.defer();
			var encoded_query = encodeURIComponent(query);
			
			$http.get(ApiConfig.apiUrl + 'property?' + query, {
				headers: {
					Accept: "odata.metadata=full",
					Authorization: 'Bearer ' + KeyStorageService.getToken()
				}
			})
			.success(function (res){
				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();