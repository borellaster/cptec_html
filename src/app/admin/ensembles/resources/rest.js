define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('EnsemblesResource', EnsemblesResource);
  EnsemblesResource.$inject = ['$resource'];
  function EnsemblesResource($resource) {
    var rest = $resource(
      'api/v1/ensembles/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('EnsemblesPaginationResource', EnsemblesPaginationResource);
  EnsemblesPaginationResource.$inject = ['$resource'];
  function EnsemblesPaginationResource($resource) {
    var rest = $resource(
      'api/v1/ensembles/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }

  module.factory('EnsemblesComboResource', EnsemblesComboResource);
  EnsemblesComboResource.$inject = ['$resource'];
  function EnsemblesComboResource($resource) {
    var rest = $resource(
      'api/v1/public/ensembles', {}
    );
    return rest;
  }        

});
