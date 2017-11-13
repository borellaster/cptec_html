define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelsFactory', ModelsFactory);

  ModelsFactory.$inject = [
    'ModelsResource', '$location', 'ModelsSearchResource', 'ModelsPaginationResource', 'ModelsComboResource'
  ];

  function ModelsFactory(resource, $location, resourceSearch, resourcePagination, resourceCombo) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      combo: combo,
      getArraySituacao: getArraySituacao
    };

    return service;

    function save(models) {
      if(models.id == undefined){
          return resource.save(models).$promise;
        }else{
          return resource.update({'id': models.id}, models).$promise;
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

    function getArraySituacao() {
      var array = [
        {val: 'S', desc: 'Sim'},
        {val: 'N', desc: 'Não'}
      ];
      return array;
    }         
  };
});