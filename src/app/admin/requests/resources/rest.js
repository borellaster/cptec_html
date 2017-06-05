define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('RequestsResource', RequestsResource);
  RequestsResource.$inject = ['$resource'];
  function RequestsResource($resource) {
    var rest = $resource(
      'api/v1/requests/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('RequestsPaginationResource', RequestsPaginationResource);
  RequestsPaginationResource.$inject = ['$resource'];
  function RequestsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/requests/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }  

  module.factory('RequestsDownloadResource', RequestsDownloadResource);
  RequestsDownloadResource.$inject = ['$resource'];
  function RequestsDownloadResource($resource) {
    var rest = $resource(
      'api/v1/public/requests/:hash', 
      {
        'hash': ''
      }
    );
    return rest;
  }     

});
