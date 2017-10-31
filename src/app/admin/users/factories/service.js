define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('UsersFactory', UsersFactory);
  UsersFactory.$inject = [
    'UsersResource', '$location', 'UsersSearchResource', 'UsersPaginationResource', 'UsersComboResource'
  ];

  function UsersFactory(resource, $location, resourceSearch, resourcePagination, resourceCombo) {
    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      combo: combo
    };

    return service;

    function save(users) {
      if(users.id == undefined){
          return resource.save(users).$promise;
        }else{
          return resource.update({'id': users.id}, users).$promise;
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