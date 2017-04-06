define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('EnsemblesFactory', EnsemblesFactory);

  EnsemblesFactory.$inject = [
    'EnsemblesResource', '$location', 'EnsemblesSearchResource', 'EnsemblesPaginationResource'
  ];

  function EnsemblesFactory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(ensembles) {
      if(ensembles.id == undefined){
          return resource.save(ensembles).$promise;
        }else{
          return resource.update({'id': ensembles.id}, ensembles).$promise;
        }
    }

    function findById(id) {
      return resource.get({'id': id}).$promise;
    }

    function remove(id){
      return resource.delete({'id': id}).$promise;
    }

    function search(page, size, name){
        return resourceSearch.get({'page': page, 'size': size, 'name': name}).$promise;
    }

    function list(page, size){
        return resourcePagination.get({'page': page, 'size': size}).$promise;
    }
  };
});