define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('MapResource', MapResource);
  MapResource.$inject = ['$resource'];
  function MapResource($resource) {
    var rest = $resource(
      'api/v1/public/json/:longitude/:latitude/:variables',
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
