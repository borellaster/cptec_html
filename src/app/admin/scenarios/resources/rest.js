define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ScenariosResource', ScenariosResource);
  ScenariosResource.$inject = ['$resource'];
  function ScenariosResource($resource) {
    var rest = $resource(
      'api/v1/scenarios/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('ScenariosPaginationResource', ScenariosPaginationResource);
  ScenariosPaginationResource.$inject = ['$resource'];
  function ScenariosPaginationResource($resource) {
    var rest = $resource(
      'api/v1/scenarios/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }    

});
