(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.factories', [
			'rets-rabbit-angular.factory.auth',
			'rets-rabbit-angular.factory.metadata',
			'rets-rabbit-angular.factory.queries',
			'rets-rabbit-angular.factory.properties.v1',
			'rets-rabbit-angular.factory.properties.v2',
			'rets-rabbit-angular.factory.session.interceptor'
		]);
})();