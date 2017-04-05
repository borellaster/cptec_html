define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelsSearchResource', ModelsSearchResource);
  ModelsSearchResource.$inject = ['$resource'];
  
  function ModelsSearchResource($resource) {
    var rest = $resource(
      'api/v1/models/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
