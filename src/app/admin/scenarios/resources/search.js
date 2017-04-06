define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ScenariosSearchResource', ScenariosSearchResource);
  ScenariosSearchResource.$inject = ['$resource'];
  
  function ScenariosSearchResource($resource) {
    var rest = $resource(
      'api/v1/scenarios/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
