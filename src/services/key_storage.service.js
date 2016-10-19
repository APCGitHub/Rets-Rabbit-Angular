(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.service.key_storage', [])
		.service('KeyStorageService', Service);

	Service.$inject = ['$window', 'ApiConfig'];

	function Service($window, ApiConfig) {
		this.v1 = {
			saveToken: function (token){
				var key = ApiConfig.v1.storageKey;

				$window.localStorage.setItem(key, token);
			},
			getToken: function () {
				var key = ApiConfig.v1.storageKey;

				var token = $window.localStorage.getItem(key);

				return token;
			}
		};

		this.v2 = {
			saveToken: function (token){
				var key = ApiConfig.v2.storageKey;

				$window.localStorage.setItem(key, token);
			},
			getToken: function () {
				var key = ApiConfig.v2.storageKey;

				var token = $window.localStorage.getItem(key);

				return token;
			}
		};
	}
})();