define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesFactory', StatesFactory);

  StatesFactory.$inject = [
    'StatesResource', '$location', 'StatesSearchResource'
  ];

  function StatesFactory(resource, $location, resourceSearch) {

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

    function search(name, page, size){
        return resourceSearch.get({'name': name, 'page': page, 'size': size}).$promise;
    }

    function list(page, size){
        return resource.get({'page': page, 'size': size}).$promise;
    }
  };
});