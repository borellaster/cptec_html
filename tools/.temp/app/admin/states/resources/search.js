define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesSearchResource', StatesSearchResource);
  StatesSearchResource.$inject = ['$resource'];
  
  function StatesSearchResource($resource) {
    var rest = $resource(
      'api/v1/states/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
