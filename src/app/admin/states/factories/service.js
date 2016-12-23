define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesFactory', StatesFactory);

  StatesFactory.$inject = [
    'StatesResource', '$location', 'StatesSearchResource', 'StatesPaginationResource'
  ];

  function StatesFactory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(states) {
      if(states.id == undefined){
          return resource.save(states).$promise;
        }else{
          return resource.update({'id': states.id}, states).$promise;
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