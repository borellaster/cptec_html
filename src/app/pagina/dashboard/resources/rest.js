define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('RequestsResource', RequestsResource);
  RequestsResource.$inject = ['$resource'];
  function RequestsResource($resource) {
    var rest = $resource(
      'api/v1/requests/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }  

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
      'api/v1/public/json/:longitude/:latitude/:variables/:startmonth/:startyear/:endmonth/:endyear/:id/:page/:size',
      {
        'longitude': '', 'latitude': '', 'variables': '', 'startmonth': '', 'startyear': '', 'endmonth': '', 'endyear': '', 'id': '', 'page': '', 'size': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }  

  module.factory('ProcessRequestResource', ProcessRequestResource);
  ProcessRequestResource.$inject = ['$resource'];
  function ProcessRequestResource($resource) {
    var rest = $resource(
      'api/v1/public/requests/process/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  } 

  module.factory('YearRequestResource', YearRequestResource);
  YearRequestResource.$inject = ['$resource'];
  function YearRequestResource($resource) {
    var rest = $resource(
      'api/v1/public/years',
      {

      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('MonthRequestResource', MonthRequestResource);
  MonthRequestResource.$inject = ['$resource'];
  function MonthRequestResource($resource) {
    var rest = $resource(
      'api/v1/public/months',
      {

      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }
});
