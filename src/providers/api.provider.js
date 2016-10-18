(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.provider.api', [])
		.provider('ApiConfig', Provider);

	Provider.$inject = [];

	function Provider() {
		var config = {
			baseUrl: 'https://stage.retsrabbit.com/',
			apiEndPoint: 'api/v2/',
			clientId: 'retsrabbit',
			clientSecret: 'retsrabbit',
			storageKey: 'access_token'
		},
		provider = {
			setBaseUrl: function (url){
				if(url === '')
					return;

				config.baseUrl = url;
				if(config.baseUrl[config.baseUrl.length - 1] !== '/')
					config.baseUrl += '/';
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
			setStorageKey: function (key){
				config.storageKey = key;
			},
			$get: function () {
				return {
					baseUrl: config.baseUrl,
					apiUrl: config.baseUrl + config.apiEndPoint,
					clientId: config.clientId,
					clientSecret: config.clientSecret,
					storageKey: config.storageKey
				}
			}
		};

		return provider;
	}
})();