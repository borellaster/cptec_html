define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('MapFactory', MapFactory);
  MapFactory.$inject = [
    'MapResource', '$location'
  ];

  function MapFactory(resource, $location) {
    var service = {
      list: list
    };

    return service;

    function list(longitude, latitude, variables){
        return resource.get({'longitude': longitude, 'latitude': latitude, 'variables': variables}).$promise;
    }    

   };
  
});