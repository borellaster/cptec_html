define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CitiesResource', CitiesResource);
  CitiesResource.$inject = ['$resource'];
  function CitiesResource($resource) {
    var rest = $resource(
      'rest/cities/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('CitiesPaginationResource', CitiesPaginationResource);
  CitiesPaginationResource.$inject = ['$resource'];
  function CitiesPaginationResource($resource) {
    var rest = $resource(
      'rest/cities/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});