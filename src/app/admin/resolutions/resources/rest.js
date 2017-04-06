define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ResolutionsResource', ResolutionsResource);
  ResolutionsResource.$inject = ['$resource'];
  function ResolutionsResource($resource) {
    var rest = $resource(
      'api/v1/resolutions/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('ResolutionsPaginationResource', ResolutionsPaginationResource);
  ResolutionsPaginationResource.$inject = ['$resource'];
  function ResolutionsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/resolutions/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
