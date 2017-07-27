define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('FrequenciesResource', FrequenciesResource);
  FrequenciesResource.$inject = ['$resource'];
  function FrequenciesResource($resource) {
    var rest = $resource(
      'api/v1/frequencies/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('FrequenciesPaginationResource', FrequenciesPaginationResource);
  FrequenciesPaginationResource.$inject = ['$resource'];
  function FrequenciesPaginationResource($resource) {
    var rest = $resource(
      'api/v1/frequencies/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }

  module.factory('FrequenciesComboResource', FrequenciesComboResource);
  FrequenciesComboResource.$inject = ['$resource'];
  function FrequenciesComboResource($resource) {
    var rest = $resource(
      'api/v1/public/frequencies', {}
    );
    return rest;
  }        

});
