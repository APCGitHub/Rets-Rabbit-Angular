(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factory.auth', [])
		.factory('AuthFactory', Factory);

	Factory.$inject = ['$http', '$q', '$window'];

	function Factory($http, $q, $window) {
		var factory = {
			getToken: _getToken
		};

		return factory;

		function _getToken(){
			var deferred = $q.defer();

			$http({
				method: 'POST',
				url: Constants.apiUrl + 'oauth/access_token',
				data: {
					client_id: Constants.clientId,
					client_secret: Constants.clientSecret,
					grant_type: 'credentials'
				}
			}).success(function (res){
				var token = res.token;
				deferred.resolve(token);
			}).error(function (err){
				deferred.reject(err);
			});

			return deferred;
		}
	}
})();