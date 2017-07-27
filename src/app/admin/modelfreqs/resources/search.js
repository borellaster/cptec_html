define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelfreqsSearchResource', ModelfreqsSearchResource);
  ModelfreqsSearchResource.$inject = ['$resource'];
  
  function ModelfreqsSearchResource($resource) {
    var rest = $resource(
      'api/v1/modelfreqs/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
