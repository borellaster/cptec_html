define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('IntervalsFactory', IntervalsFactory);

  IntervalsFactory.$inject = [
    'IntervalsResource', '$location', 'IntervalsSearchResource', 'IntervalsPaginationResource'
  ];

  function IntervalsFactory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(intervals) {
      if(intervals.id == undefined){
          return resource.save(intervals).$promise;
        }else{
          return resource.update({'id': intervals.id}, intervals).$promise;
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