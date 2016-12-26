define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('VariablesResource', VariablesResource);
  VariablesResource.$inject = ['$resource'];
  function VariablesResource($resource) {
    var rest = $resource(
      'rest/variables/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('VariablesPaginationResource', VariablesPaginationResource);
  VariablesPaginationResource.$inject = ['$resource'];
  function VariablesPaginationResource($resource) {
    var rest = $resource(
      'rest/variables/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
