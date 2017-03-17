define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('CountriesFactory', CountriesFactory);
  CountriesFactory.$inject = [
    'CountriesResource', '$location', 'CountriesSearchResource', 'CountriesPaginationResource', 'CountriesComboResource'
  ];

  function CountriesFactory(resource, $location, resourceSearch, resourcePagination, resourceCombo) {
    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      combo: combo
    };

    return service;

    function save(countries) {
      if(countries.id == undefined){
          return resource.save(countries).$promise;
        }else{
          return resource.update({'id': countries.id}, countries).$promise;
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

    function combo(){
        return resourceCombo.get().$promise;
    }

  };
  
});