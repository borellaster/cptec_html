define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('<%= helpers.capitalize( name ) %>Factory', <%= helpers.capitalize( name ) %>Factory);

  <%= helpers.capitalize( name ) %>Factory.$inject = [
    '<%= helpers.capitalize( name ) %>Resource', '$location', '<%= helpers.capitalize( name ) %>SearchResource', '<%= helpers.capitalize( name ) %>PaginationResource'
  ];

  function <%= helpers.capitalize( name ) %>Factory(resource, $location, resourceSearch, resourcePagination) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list
    };

    return service;

    function save(<%= name %>) {
      if(<%= name %>.id == undefined){
          return resource.save(<%= name %>).$promise;
        }else{
          return resource.update({'id': <%= name %>.id}, <%= name %>).$promise;
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