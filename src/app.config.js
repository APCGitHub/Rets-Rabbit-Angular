(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.config', [])
		.config(Config);

	Config.$inject = ['$httpProvider'];

	function Config($httpProvider) {
		$httpProvider.interceptors.push('SessionInterceptorFactory');
	}
})();