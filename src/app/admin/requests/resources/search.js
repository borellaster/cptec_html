define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('RequestsSearchResource', RequestsSearchResource);
  RequestsSearchResource.$inject = ['$resource'];
  
  function RequestsSearchResource($resource) {
    var rest = $resource(
      'api/v1/requests/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
