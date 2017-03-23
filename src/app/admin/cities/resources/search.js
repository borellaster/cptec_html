define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CitiesSearchResource', CitiesSearchResource);
  CitiesSearchResource.$inject = ['$resource'];
  
  function CitiesSearchResource($resource) {
    var rest = $resource(
      'api/v1/cities/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
