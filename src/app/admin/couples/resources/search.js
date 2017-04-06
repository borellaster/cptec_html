define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CouplesSearchResource', CouplesSearchResource);
  CouplesSearchResource.$inject = ['$resource'];
  
  function CouplesSearchResource($resource) {
    var rest = $resource(
      'api/v1/couples/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
