define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('UsersSearchResource', UsersSearchResource);
  UsersSearchResource.$inject = ['$resource'];

  function UsersSearchResource($resource) {
    var rest = $resource(
      'api/v1/users/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }
});
