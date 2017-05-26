define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ConfigurationsSearchResource', ConfigurationsSearchResource);
  ConfigurationsSearchResource.$inject = ['$resource'];
  
  function ConfigurationsSearchResource($resource) {
    var rest = $resource(
      'api/v1/configurations/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
