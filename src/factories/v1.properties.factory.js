/**
 * Created by aclinton on 10/19/16.
 */
(function () {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.properties.v1', [])
        .factory('PropertyFactoryV1', Factory);

    Factory.$inject = ['$q', '$http', 'ApiConfig', 'KeyStorageService'];

    function Factory ($q, $http, ApiConfig, KeyStorageService) {
        var factory = {
            search: _search,
            metadata: _metadata,
            servers: _servers
        };

        return factory;

        function _search(server_hash, query_string) {
            var deferred = $q.defer();

            $http.get(ApiConfig.v1.apiUrl + server_hash + '/listing/search?' + query_string, {
                headers: {
                    Authorization: 'Bearer ' + KeyStorageService.v1.getToken()
                }
            }).success(function (res){
                deferred.resolve(res);
            }).error(function (res){
                deferred.reject(res);
            });

            return deferred.promise;
        }

        function _metadata(server_hash) {
            var deferred = $q.defer();

            $http.get(ApiConfig.v1.apiUrl + server_hash + '/metadata/explorer', {
                headers: {
                    Authorization: 'Bearer ' + KeyStorageService.v1.getToken()
                }
            }).success(function (res){
                deferred.resolve(res);
            }).error(function (res) {
                deferred.reject(res);
            });

            return deferred.promise;
        }

        function _servers() {
            var deferred = $q.defer();

            $http.get(ApiConfig.v1.apiUrl + 'server', {
                headers: {
                    Authorization: 'Bearer ' + KeyStorageService.v1.getToken()
                }
            }).success(function (res){
                deferred.resolve(res);
            }).error(function (res){
                deferred.reject(res);
            });

            return deferred.promise;
        }
    }
})();
