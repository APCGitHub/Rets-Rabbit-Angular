(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.provider.api', [])
		.provider('ApiConfig', Provider);

	Provider.$inject = [];

	function Provider() {
		var config = {
			baseUrl: 'http://stage.retsrabbit.com/',
			apiEndPoint: 'api/v2/',
			clientId: '',
			clientSecret: ''
		},
		provider = {
			setBaseUrl: function (url){
				console.log('setting base url to: ' + url);
				if(url === '')
					return;

				config.baseUrl = url;
				if(config.baseUrl[config.baseUrl.length - 1] !== '/')
					config.baseUrl += '/';
			},
			setApiEndPoint: function (endpoint){
				console.log('setting api endpoint to: ' + endpoint);
				config.api = endpoint;
			},
			setClientId: function (id){
				console.log('setting client id to: ' + id);
				config.clientId = id;
			},
			setClientSecret: function (secret){
				console.log('setting client secret to: ' + secret);
				config.clientSecret = secret;
			},
			$get: function () {
				return {
					baseUrl: config.baseUrl,
					apiUrl: config.baseUrl + config.apiEndPoint,
					clientId: config.clientId,
					clientSecret: config.clientSecret
				}
			}
		};

		return provider;
	}
})();