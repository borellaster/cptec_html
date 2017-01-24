define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('UniqueResource', UniqueResource);
  UniqueResource.$inject = ['$resource'];
  function UniqueResource($resource) {
    var rest = $resource(
      'rest/public/json/:longitude/:latitude/:variables',
      {
        'longitude': '', 'latitude': '', 'variables': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

 

});
