define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('TypesSearchResource', TypesSearchResource);
  TypesSearchResource.$inject = ['$resource'];
  
  function TypesSearchResource($resource) {
    var rest = $resource(
      'rest/types/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
