define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('UniqueFactory', UniqueFactory);
  UniqueFactory.$inject = [
    'UniqueResource', '$location'
  ];

  function UniqueFactory(resource, $location) {
    var service = {
      list: list
    };

    return service;

    function list(longitude, latitude, variables){
        return resource.get({'longitude': longitude, 'latitude': latitude, 'variables': variables}).$promise;
    }    

   };
  
});