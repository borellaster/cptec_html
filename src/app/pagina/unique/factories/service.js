define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('UniqueFactory', UniqueFactory);
  UniqueFactory.$inject = [
    'CountriesResource', '$location'
  ];

  function UniqueFactory(resource, $location) {
    var service = {

    };

    return service;

   };
  
});