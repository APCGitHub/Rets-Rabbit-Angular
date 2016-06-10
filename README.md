# Rets-Rabbit-Angular
This is an angular module which provides a variety of factories and services which hit the Rets Rabbit API

***
## Get Started

You can install this package via bower

```bash
$ bower install rets-rabbit-angular
```

##Usage
1. Factories
2. Providers

####Factories
This package comes with two factories:

* RRAuthFactory
* PropertyFactory

**RRAuthFactory**

This factory has one publicly available method: **getToken**

* **getToken**: returns a response from the Retsrabbit API containing an access_token

```javascript
RRAuthFactory.getToken().then(function (res){
	var token = res.access_token;
	//do stuff with token
}, function (err){
	//handle error
});
```

**PropertyFactory**

This factory has two publicly available methods: **search**, **findOne**

* search: accepts an **unencoded** ODATA *query* string and returns the results from the server

```javascript
var query = "$select=ListPrice, ListingId, OriginalListPrice&$filter=ListPrice gt OriginalListPrice&$orderby=ListPrice asc";

PropertyFactory.search(query).then(function (res){
	var total_count = res['@retsrabbit.total_results'];
	var count = res['@odata.count'];
	var results = res.value;
	
	//do awesome things with results
}, function (err){
	//handle error
});
```

####Providers
This package comes with one provider:

1. ApiConfig

**ApiConfig**

This provider has several setters which can be used to configure the service inside of an angular **config** module.

* **setBaseUrl**: Used to set the base url for querying. For example, *https://api.retsrabbit.com/*

* **setApiEndPoint**: Used to set the specific versioning. For example, *api/v2*

* **setClientId**: Used to set the client_id which can be found under the **API** page on the Retsrabbit dashboard

* **setClientSecret**: Used to set the client_secret which can be found under the **API** page on the Retsrabbit dashboard

An example of using the setters can be seen below.

*Make sure you suffix the provider with the "Provider" keyword when injecting into a config module so that angular knows you are using it as a Provider and not a service/factory.*

```javascript
ApiConfigProvider.setBaseUrl("https://api.retsrabbit.com/");        ApiConfigProvider.setClientId("clientidgoeshere");
ApiConfigProvider.setClientSecret("supersecretpassword");
```
The provider has several public getters which can be used to get api related information.

* **baseUrl**: Just returns the base url set in the getter
* **apiUrl**: Returns the base url plus the api endpoint
* **clientId**: Returns the client_id
* **clientSecret**: Returns the client_secret











