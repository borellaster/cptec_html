define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CountriesSearchResource', CountriesSearchResource);
  CountriesSearchResource.$inject = ['$resource'];

  function CountriesSearchResource($resource) {
    var rest = $resource(
      'api/v1/countries/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }
});
