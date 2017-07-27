define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ModelfreqsFactory', ModelfreqsFactory);

  ModelfreqsFactory.$inject = [
    'ModelfreqsResource', '$location', 'ModelfreqsSearchResource', 'ModelfreqsPaginationResource'
  ];

  function ModelfreqsFactory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(modelfreqs) {
      if(modelfreqs.id == undefined){
          return resource.save(modelfreqs).$promise;
        }else{
          return resource.update({'id': modelfreqs.id}, modelfreqs).$promise;
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