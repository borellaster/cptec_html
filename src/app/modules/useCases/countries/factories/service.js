define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CountriesFactory', CountriesFactory);

  CountriesFactory.$inject = [
    'CountriesResource', '$location', 'CountriesSearchResource'
  ];

  function CountriesFactory(resource, $location, resourceSearch) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(countries) {
      if(countries.id > 0){
          return resource.update({'id': countries.id}, countries).$promise;
        }else{
          return resource.save(countries).$promise;
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