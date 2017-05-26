define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ConfigurationsResource', ConfigurationsResource);
  ConfigurationsResource.$inject = ['$resource'];
  function ConfigurationsResource($resource) {
    var rest = $resource(
      'api/v1/configurations/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('ConfigurationsPaginationResource', ConfigurationsPaginationResource);
  ConfigurationsPaginationResource.$inject = ['$resource'];
  function ConfigurationsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/configurations/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
