# Rets-Rabbit-Angular
This is an angular module which provides a variety of factories and services which hit the Rets Rabbit V2 API

***
## Get Started

You can install this package via bower

```
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

```
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

```
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

This provider has several setters which can be used to configure the service inside of a config block.








