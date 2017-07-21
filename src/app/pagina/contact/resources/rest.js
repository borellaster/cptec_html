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


  module.factory('UniquePagResource', UniquePagResource);
  UniquePagResource.$inject = ['$resource'];
  function UniquePagResource($resource) {
    var rest = $resource(
      'api/v1/public/json/:longitude/:latitude/:variables/:startdate/:enddate/:page/:size',
      {
        'longitude': '', 'latitude': '', 'variables': '', 'startdate': '', 'enddate': '', 'page': '', 'size': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }  

 

});
