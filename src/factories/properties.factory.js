(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.properties', [])
		.factory('PropertyFactory', Factory);

	Factory.$inject = ['$http', '$q', 'ApiProvider'];

	function Factory($http, $q, ApiProvider) {
		var factory = {
			search: _search,
			findOne: _findOne
		};

		return factory;

		function _search(query) {
			var deferred = $q.defer();

			$http.get(ApiProvider.apiUrl + 'property')
			.success(function (res){
				var listings = res.value;
				deferred.resolve(listings);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function _findOne(id){
			var deferred = $q.defer();
			
			$http.get(ApiProvider.apiUrl + 'property/' + id)
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