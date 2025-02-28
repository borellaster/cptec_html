define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('RequestsFactory', RequestsFactory);

  RequestsFactory.$inject = [
    'RequestsResource', '$location', 'RequestsSearchResource', 'RequestsPaginationResource', 'RequestsDownloadResource'
  ];

  function RequestsFactory(resource, $location, resourceSearch, resourcePagination, resourceDownload) {

    var service = {
      save: save,
      findById: findById,
      remove: remove,
      search: search,
      list: list,
      findByHashDownload: findByHashDownload
    };

    return service;

    function save(requests) {
      if(requests.id == undefined){
          return resource.save(requests).$promise;
        }else{
          return resource.update({'id': requests.id}, requests).$promise;
        }
    }

    function findById(id) {
      return resource.get({'id': id}).$promise;
    }

    function findByHashDownload(hash) {
      return resourceDownload.get({'hash': hash}).$promise;
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