define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('EnsemblesSearchResource', EnsemblesSearchResource);
  EnsemblesSearchResource.$inject = ['$resource'];
  
  function EnsemblesSearchResource($resource) {
    var rest = $resource(
      'api/v1/ensembles/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
