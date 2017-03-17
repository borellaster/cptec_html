define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesResource', StatesResource);
  StatesResource.$inject = ['$resource'];
  function StatesResource($resource) {
    var rest = $resource(
      'rest/states/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('StatesPaginationResource', StatesPaginationResource);
  StatesPaginationResource.$inject = ['$resource'];
  function StatesPaginationResource($resource) {
    var rest = $resource(
      'rest/states/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }  

  module.factory('StatesComboResource', StatesComboResource);
  StatesComboResource.$inject = ['$resource'];
  function StatesComboResource($resource) {
    var rest = $resource(
      'rest/native/states/wrapper', {}
    );
    return rest;
  }     

});
