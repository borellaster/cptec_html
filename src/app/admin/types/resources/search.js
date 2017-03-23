define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('TypesSearchResource', TypesSearchResource);
  TypesSearchResource.$inject = ['$resource'];
  
  function TypesSearchResource($resource) {
    var rest = $resource(
      'api/v1/types/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
