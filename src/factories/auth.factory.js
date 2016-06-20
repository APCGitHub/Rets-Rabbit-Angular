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
					grant_type: 'client_credentials'
				}
			}).success(function (res){
				console.log('here');
				$window.localStorage.setItem('token', res.access_token);
				console.log($window.localStorage.getItem('token'));
				deferred.resolve(res);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();