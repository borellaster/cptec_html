define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('DashboardResource', DashboardResource);
  DashboardResource.$inject = ['$resource'];
  function DashboardResource($resource) {
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


  module.factory('DashboardPagResource', DashboardPagResource);
  DashboardPagResource.$inject = ['$resource'];
  function DashboardPagResource($resource) {
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