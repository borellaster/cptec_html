define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelsResource', ModelsResource);
  ModelsResource.$inject = ['$resource'];
  function ModelsResource($resource) {
    var rest = $resource(
      'api/v1/models/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('ModelsPaginationResource', ModelsPaginationResource);
  ModelsPaginationResource.$inject = ['$resource'];
  function ModelsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/models/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }   

  module.factory('ModelsComboResource', ModelsComboResource);
  ModelsComboResource.$inject = ['$resource'];
  function ModelsComboResource($resource) {
    var rest = $resource(
      'api/v1/public/models', {}
    );
    return rest;
  }     

});
