define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CouplesFactory', CouplesFactory);

  CouplesFactory.$inject = [
    'CouplesResource', '$location', 'CouplesSearchResource', 'CouplesPaginationResource', 'CouplesComboResource'
  ];

  function CouplesFactory(resource, $location, resourceSearch, resourcePagination, resourceCombo) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      combo: combo
    };

    return service;

    function save(couples) {
      if(couples.id == undefined){
          return resource.save(couples).$promise;
        }else{
          return resource.update({'id': couples.id}, couples).$promise;
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