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

    function list(longitude, latitude, variables, startdate, enddate){
      return resource.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startdate': startdate,
          'enddate': enddate
      }).$promise;
    }   

    function listpag(longitude, latitude, variables, startdate, enddate, page, size){
      return resourcePag.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startdate': startdate,
          'enddate': enddate,          
          'page': page,
          'size': size
      }).$promise;
    }      

   };
  
});