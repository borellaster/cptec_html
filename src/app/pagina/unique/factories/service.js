define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('UniqueFactory', UniqueFactory);
  UniqueFactory.$inject = [
    'UniqueResource', 'UniquePagResource'
  ];

  function UniqueFactory(resource, resourcePag) {
    var service = {
      list: list,
      listpag: listpag
    };

    return service;

    function list(longitude, latitude, variables){
      return resource.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables
      }).$promise;
    }   

    function listpag(longitude, latitude, variables, page, size){
      return resourcePag.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'page': page,
          'size': size
      }).$promise;
    }      

   };
  
});