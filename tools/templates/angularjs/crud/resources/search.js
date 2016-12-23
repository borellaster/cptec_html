define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('<%= helpers.capitalize( name ) %>SearchResource', <%= helpers.capitalize( name ) %>SearchResource);
  <%= helpers.capitalize( name ) %>SearchResource.$inject = ['$resource'];
  
  function <%= helpers.capitalize( name ) %>SearchResource($resource) {
    var rest = $resource(
      '<%= endpoint %>/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
