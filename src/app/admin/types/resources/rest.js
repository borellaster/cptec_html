define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('TypesResource', TypesResource);
  TypesResource.$inject = ['$resource'];
  function TypesResource($resource) {
    var rest = $resource(
      'api/v1/types/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('TypesPaginationResource', TypesPaginationResource);
  TypesPaginationResource.$inject = ['$resource'];
  function TypesPaginationResource($resource) {
    var rest = $resource(
      'api/v1/types/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
