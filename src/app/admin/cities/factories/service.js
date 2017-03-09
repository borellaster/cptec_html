define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CitiesFactory', CitiesFactory);

  CitiesFactory.$inject = [
    'CitiesResource', '$location', 'CitiesSearchResource', 'CitiesPaginationResource', 'CitiesComboResource'
  ];

  function CitiesFactory(resource, $location, resourceSearch, resourcePagination, resourceCombo) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      combo: combo
    };

    return service;

    function save(cities) {
      if(cities.id == undefined){
          return resource.save(cities).$promise;
        }else{
          return resource.update({'id': cities.id}, cities).$promise;
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

    function combo(name){
        return resourceCombo.get({'name': name}).$promise;
    }    
  };
});