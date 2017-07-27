define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelfreqsResource', ModelfreqsResource);
  ModelfreqsResource.$inject = ['$resource'];
  function ModelfreqsResource($resource) {
    var rest = $resource(
      'api/v1/modelfreqs/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('ModelfreqsPaginationResource', ModelfreqsPaginationResource);
  ModelfreqsPaginationResource.$inject = ['$resource'];
  function ModelfreqsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/modelfreqs/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
