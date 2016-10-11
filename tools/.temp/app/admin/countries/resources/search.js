define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CountriesSearchResource', CountriesSearchResource);

  //---

  CountriesSearchResource.$inject = ['$resource'];

  function CountriesSearchResource($resource) {

    var rest = $resource(
      'rest/countries/search/:name'
    );

    return rest;

  }

});
