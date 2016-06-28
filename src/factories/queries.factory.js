(function() {
    'use strict';

    angular
        .module('rets-rabbit-angular.factory.queries', [])
        .factory('QueryFactory', Factory);

    function Factory() {
        var factory = {
            queries: _queries
        };

        return factory;

        function _queries() {
            return [{
                title: 'Equals Comparison',
                description: 'Get properties where the Listing Agent\'s last name (field ListAgentLastName) is \'Smith\' (case sensitive).',
                query: {
                    select: 'ListingId, ListPrice, ListAgentFirstName, ListAgentLastName',
                    filter: [{value: 'ListAgentLastName eq \'Smith\'', join: 'and'}],
                    orderby: [],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Multiple Field Values',
                description: 'This query gets properties where the listing agent\'s last name is either \'Smith\' or \'Doe\'.',
                query: {
                    select: 'ListingId, ListPrice, ListAgentFirstName',
                    filter: [
                        {
                            value: 'ListAgentLastName eq \'Doe\'', join: 'or'
                        }, 
                        {
                            value: 'ListAgentLastName eq \'Smith\'', join: 'and'
                        }
                    ],
                    orderby: [],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Wildcard Search',
                description: 'You can do wildcard or case insensitive searches by using the special string functions with the $filter option.',
                query: {
                    select: 'ListingId, ListPrice, ListAgentFirstName',
                    filter: [{value: 'startswith(ListAgentFirstName, \'joh\')', join: 'and'}],
                    orderby: [],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Numeric Range',
                description: 'This query selects properties with a listing price between $50K & $200K .',
                query: {
                    select: 'ListingId, ListPrice',
                    filter: [{value: 'ListPrice ge 50000', join: 'and'}, {value: 'ListPrice le 200000', join: ''}],
                    orderby: [],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Date Filtering',
                description: 'This query gets properties listed in June 2016 by the ListingContractDate field.',
                query: {
                    select: 'ListingId, ListPrice, ListingContractDate',
                    filter: [
                        {value: 'year(ListingContractDate) eq 2016', join: 'and'},
                        {value: 'month(ListingContractDate) eq 6', join: ''}
                    ],
                    orderby: [],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Sorting',
                description: 'This query is sorted (asc) by the ListPrice field.',
                query: {
                    select: 'ListingId, ListPrice, ListingContractDate',
                    filter: [
                        {value: 'year(ListingContractDate) eq 2016', join: 'and'},
                        {value: 'month(ListingContractDate) eq 6', join: ''}
                    ],
                    orderby: [{value: 'ListPrice', direction: 'asc'}],
                    top: '',
                    skip: ''
                }
            }, {
                title: 'Pagination',
                description: 'This query gets the next set of results by passing a $skip parameter value of 11 with a $top value of 10.',
                query: {
                    select: 'ListingId, ListPrice, ListingContractDate',
                    filter: [
                        {value: 'year(ListingContractDate) eq 2016', join: 'and'},
                        {value: 'month(ListingContractDate) eq 6', join: ''}
                    ],
                    orderby: [{value: 'ListPrice', direction: 'asc'}],
                    top: '10',
                    skip: '11'
                }
            }]
        }
    }
})();
