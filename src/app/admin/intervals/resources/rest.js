define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('IntervalsResource', IntervalsResource);
  IntervalsResource.$inject = ['$resource'];
  function IntervalsResource($resource) {
    var rest = $resource(
      'api/v1/intervals/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('IntervalsPaginationResource', IntervalsPaginationResource);
  IntervalsPaginationResource.$inject = ['$resource'];
  function IntervalsPaginationResource($resource) {
    var rest = $resource(
      'api/v1/intervals/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
