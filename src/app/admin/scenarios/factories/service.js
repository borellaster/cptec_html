define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ScenariosFactory', ScenariosFactory);

  ScenariosFactory.$inject = [
    'ScenariosResource', '$location', 'ScenariosSearchResource', 'ScenariosPaginationResource'
  ];

  function ScenariosFactory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(scenarios) {
      if(scenarios.id == undefined){
          return resource.save(scenarios).$promise;
        }else{
          return resource.update({'id': scenarios.id}, scenarios).$promise;
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