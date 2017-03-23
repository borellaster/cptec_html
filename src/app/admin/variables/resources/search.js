define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('VariablesSearchResource', VariablesSearchResource);
  VariablesSearchResource.$inject = ['$resource'];
  
  function VariablesSearchResource($resource) {
    var rest = $resource(
      'api/v1/variables/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
