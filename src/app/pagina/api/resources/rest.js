define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('UniqueResource', UniqueResource);
  UniqueResource.$inject = ['$resource'];
  function UniqueResource($resource) {
    var rest = $resource(
      'api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate',
      {
        'longitude': '', 'latitude': '', 'variables': '', 'startdate': '', 'enddate': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }



});
