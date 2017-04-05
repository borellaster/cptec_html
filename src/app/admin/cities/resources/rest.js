define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CitiesResource', CitiesResource);
  CitiesResource.$inject = ['$resource'];
  function CitiesResource($resource) {
    var rest = $resource(
      'api/v1/cities/:id',
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
      'api/v1/cities/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  } 

  module.factory('CitiesComboResource', CitiesComboResource);
  CitiesComboResource.$inject = ['$resource'];
  function CitiesComboResource($resource) {
    var rest = $resource(
      'api/v1/public/cities/:name', {}
    );
    return rest;
  }       

});
