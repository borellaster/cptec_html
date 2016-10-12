define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CountriesResource', CountriesResource);

  //---

  CountriesResource.$inject = ['$resource'];

  function CountriesResource($resource) {

    var rest = $resource(
      'rest/countries/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );

    return rest;

  }

});
