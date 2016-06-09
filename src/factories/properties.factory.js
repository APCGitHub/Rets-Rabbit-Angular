(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.properties', [])
		.factory('PropertyFactory', Factory);

	Factory.$inject = ['$http', '$q', 'ApiConfig'];

	function Factory($http, $q, ApiConfig) {
		var factory = {
			search: _search,
			findOne: _findOne
		};

		return factory;

		function _search(query) {
			var deferred = $q.defer();

			$http.get(ApiConfig.apiUrl + 'property', {
				params: query
			})
			.success(function (res){
				var listings = res.value;
				deferred.resolve(listings);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _findOne(id, request){
			var deferred = $q.defer();
			
			$http.get(ApiConfig.apiUrl + 'property/' + id, {
				params: request
			})
			.success(function (res){
				var listing = res.value;
				deferred.resolve(listing);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();