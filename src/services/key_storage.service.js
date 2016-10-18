(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.service.key_storage', [])
		.service('KeyStorageService', Service);

	Service.$inject = ['$window', 'ApiConfig'];

	function Service($window, ApiConfig) {
		this.saveToken = function(token) {
			var key = ApiConfig.storageKey;

			$window.localStorage.setItem(key, token);
		};

		this.getToken = function () {
			var key = ApiConfig.storageKey;

			var token = $window.localStorage.getItem(key);

			return token;
		};
	}
})();