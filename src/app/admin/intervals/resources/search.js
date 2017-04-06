define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('IntervalsSearchResource', IntervalsSearchResource);
  IntervalsSearchResource.$inject = ['$resource'];
  
  function IntervalsSearchResource($resource) {
    var rest = $resource(
      'api/v1/intervals/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
