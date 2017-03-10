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


  module.factory('UniquePagResource', UniquePagResource);
  UniquePagResource.$inject = ['$resource'];
  function UniquePagResource($resource) {
    var rest = $resource(
      'rest/public/json/:longitude/:latitude/:variables/:page/:size',
      {
        'longitude': '', 'latitude': '', 'variables': '', 'page': '', 'size': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }  

 

});
