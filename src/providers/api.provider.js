(function () {
	'use strict';

	angular
		.module('rets-rabbit-angular.provider.api', [])
		.provider('ApiConfig', Provider);

	Provider.$inject = [];

	function Provider() {
		var config = {
			v1: {
				baseUrl: 'https://stage.retsrabbit.com/',
				apiEndPoint: 'api/v1/',
				clientId: 'retsrabbit',
				clientSecret: 'retsrabbit',
				storageKey: 'access_token_v1'
			},
			v2: {
				baseUrl: 'https://stage.retsrabbit.com/',
				apiEndPoint: 'api/v2/',
				clientId: 'retsrabbit',
				clientSecret: 'retsrabbit',
				storageKey: 'access_token_v2'
			}
		},
		provider = {
			v1: {
				setBaseUrl: function (url){
					if(url === '')
						return;

					config.v1.baseUrl = url;
					if(config.v1.baseUrl[config.v1.baseUrl.length - 1] !== '/')
						config.v1.baseUrl += '/';
				},
				setApiEndPoint: function (endpoint){
					config.v1.apiEndPoint = endpoint;
				},
				setClientId: function (id){
					config.v1.clientId = id;
				},
				setClientSecret: function (secret){
					config.v1.clientSecret = secret;
				},
				setStorageKey: function (key){
					config.v1.storageKey = key;
				}
			},
			v2: {
				setBaseUrl: function (url){
					if(url === '')
						return;

					config.v2.baseUrl = url;
					if(config.v2.baseUrl[config.v2.baseUrl.length - 1] !== '/')
						config.v2.baseUrl += '/';
				},
				setApiEndPoint: function (endpoint){
					config.v2.apiEndPoint = endpoint;
				},
				setClientId: function (id){
					config.v2.clientId = id;
				},
				setClientSecret: function (secret){
					config.v2.clientSecret = secret;
				},
				setStorageKey: function (key){
					config.v2.storageKey = key;
				}
			},
			$get: function () {
				return {
					v1: {
						baseUrl: config.v1.baseUrl,
						apiUrl: config.v1.baseUrl + config.v1.apiEndPoint,
						clientId: config.v1.clientId,
						clientSecret: config.v1.clientSecret,
						storageKey: config.v1.storageKey
					},
					v2: {
						baseUrl: config.v2.baseUrl,
						apiUrl: config.v2.baseUrl + config.v2.apiEndPoint,
						clientId: config.v2.clientId,
						clientSecret: config.v2.clientSecret,
						storageKey: config.v2.storageKey
					}
				}
			}
		};

		return provider;
	}
})();