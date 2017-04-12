# Rets-Rabbit-Angular
This is an angular module which provides a variety of factories and services which hit the Rets Rabbit API

***
## Get Started

You can install this package via bower

```bash
$ bower install rets-rabbit-angular
```

## Usage
1. [Factories](#factories)
2. [Providers](#providers)

## Factories
This package comes with several factories:

* RRAuthFactory
* PropertyFactoryV1
* PropertyFactoryV2

### RRAuthFactory

This factory has two publicly available methods:

1. [getTokenV1](gettokenv1): returns a response from the Retsrabbit API containing an access_token
2. [getTokenV2](gettokenv2): returns a response from the Retsrabbit API containing an access_token

#### getTokenV1

~~~javascript
RRAuthFactory.getTokenV1().then(function (res){
    //getToken automatically saves the access_token in localStorage
	var token = res.access_token;
	//do stuff with token
}, function (err){
	//handle error
});
~~~

#### getTokenV2

~~~javascript
RRAuthFactory.getTokenV2().then(function (res){
    //getToken automatically saves the access_token in localStorage
	var token = res.access_token;
	//do stuff with token
}, function (err){
	//handle error
});
~~~

### PropertyFactoryV1

This factory has three public methods:

1. search
2. metadata
3. [servers](#object-servers)

#### *object* search(*string* server_hash, *string* query)

#### *object* metadata(*string* serverh_hash)

~~~javascript
PropertyFactoryV1.metadata('somehashstring').then(function (res) {
    //show metadata
}, function (err) {
    //handle err
});
~~~

#### *object* servers()

~~~javascript
PropertyFactoryV1.servers().then(function (res) {
    //show servers
}, function (err) {
    //handle error
});
~~~


### PropertyFactoryV2

This factory has three publicly available methods:

1. [search](#promise-searchint-id-object-params): accepts an **unencoded** ODATA *query* string and returns the results from the server
2. [findOne](#object-findOneint-id-string-query): find a single listing by ListingId
3. [metadata](#object-metadata): fetch the metadata for your server

#### *object* search(*string* params)

~~~javascript
var query = "$select=ListPrice, ListingId, OriginalListPrice&$filter=ListPrice gt OriginalListPrice&$orderby=ListPrice asc";

PropertyFactoryV2.search(query).then(function (res){
	var total_count = res['@retsrabbit.total_results'];
	var count = res['@odata.count'];
	var results = res.value;
	
	//do awesome things with results
}, function (err){
	//handle error
});
~~~

#### *object* findOne(*int* id, *string* query)

~~~javascript
var id = '1234';
var query = '$select=ListPrice, ListAgentFirstName';

PropertyFactoryV2.findOne(id, query).then(function(listing) {
    //show off the listing
}, function (err) {
    //handle error
});
~~~

#### *object* metadata()

~~~javascript
PropertyFactoryV2.metadata().then(function (res) {
    //do things with metadata
}, function (err) {
    //handle error
});
~~~

## Providers
This package comes with one provider:

1. ApiConfig

### ApiConfig

This provider has two different classes to handle setting the V1 and V2 config values. To access either class, you just need to append `v1` or `v2` to the provider.

This provider has several setters which can be used to configure the service inside of an angular **config** module.

* **setBaseUrl**: Used to set the base url for querying. For example, *https://api.retsrabbit.com/*

* **setApiEndPoint**: Used to set the specific versioning. For example, *api/v2*

* **setClientId**: Used to set the client_id which can be found under the **API** page on the Retsrabbit dashboard

* **setClientSecret**: Used to set the client_secret which can be found under the **API** page on the Retsrabbit dashboard

* **setStorageKey**: Use to set the local storage key for the access_token sent back by the server.

An example of using the setters can be seen below.

*Make sure you suffix the provider with the "Provider" keyword when injecting into a config module so that angular knows you are using it as a Provider and not a service/factory.*

```javascript
ApiConfigProvider.v1.setBaseUrl("https://api.retsrabbit.com/");

ApiConfigProvider.v1.setClientId("clientidgoeshere");

ApiConfigProvider.v1.setClientSecret("supersecretpassword");

ApiConfigProvider.v1.setStorageKey("access_token_v1");
```
The provider has several public getters which can be used to get api related information.

* **baseUrl**: Just returns the base url set in the getter
* **apiUrl**: Returns the base url plus the api endpoint
* **clientId**: Returns the client_id
* **clientSecret**: Returns the client_secret
* **storageKey**: Returns the local storage key for the access token
