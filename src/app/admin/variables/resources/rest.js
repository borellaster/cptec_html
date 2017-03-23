define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('VariablesResource', VariablesResource);
  VariablesResource.$inject = ['$resource'];
  function VariablesResource($resource) {
    var rest = $resource(
      'api/v1/variables/:id',
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
      'api/v1/variables/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }

  module.factory('VariablesComboResource', VariablesComboResource);
  VariablesComboResource.$inject = ['$resource'];
  function VariablesComboResource($resource) {
    var rest = $resource(
      'api/v1/native/variables/wrapper', {}
    );
    return rest;
  }         

});
