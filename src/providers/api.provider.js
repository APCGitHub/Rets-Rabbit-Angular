(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.provider.api', [])
		.provider('ApiProvider', Provider);

	Provider.$inject = [];

	function Provider() {
		var config = {
			baseUrl: '',
			apiEndPoint: '',
			clientId: '',
			clientSecret: ''
		},
		provider = {
			setBaseUrl: function (url){
				config.baseUrl = url;
			},
			setApiEndPoint: function (endpoint){
				config.api = endpoint;
			},
			setClientId: function (id){
				config.clientId = id;
			},
			setClientSecret: function (secret){
				config.clientSecret = secret;
			},
			$get: function () {
				return {
					baseUrl: config.baseUrl,
					apiEndPoint: config.apiEndPoint,
					apiUrl: config.baseUrl + config.apiEndPoint;
					clientId: config.clientId,
					clientSecret: config.clientSecret
				}
			}
		};

		return provider;
	}
})();