define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CountriesResource', CountriesResource);
  CountriesResource.$inject = ['$resource'];
  function CountriesResource($resource) {
    var rest = $resource(
      'rest/countries/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('CountriesPaginationResource', CountriesPaginationResource);
  CountriesPaginationResource.$inject = ['$resource'];
  function CountriesPaginationResource($resource) {
    var rest = $resource(
      'rest/countries/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }  

  module.factory('CountriesComboResource', CountriesComboResource);
  CountriesComboResource.$inject = ['$resource'];
  function CountriesComboResource($resource) {
    var rest = $resource(
      'rest/native/countries/wrapper', {}
    );
    return rest;
  }    

});
