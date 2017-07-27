define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('FrequenciesSearchResource', FrequenciesSearchResource);
  FrequenciesSearchResource.$inject = ['$resource'];
  
  function FrequenciesSearchResource($resource) {
    var rest = $resource(
      'api/v1/frequencies/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
