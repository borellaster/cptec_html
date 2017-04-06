define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('EnsemblesListCtrl', EnsemblesListCtrl);
  EnsemblesListCtrl.$inject = ['$state', 'PaginationFactory', 'EnsemblesSearchResource', 'EnsemblesFactory'];

  function EnsemblesListCtrl($state, pagination, ResourceSearch, dataService) {
    var vm = this;
    init();

    vm.loadData = function (page) {
      if(stringEmpty(vm.searchFilter)) {
        dataService.list(page, pagination.getPageSize()).then(function success(result) {
          vm.result = result;
          vm.currentPage = result.page;

          pagination.updateMetainf(
            result.count,
            result.data.length,
            result.page,
            result.pages
          );
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os registros.');
        });        
      }else{
        dataService.search(page, pagination.getPageSize(), vm.searchFilter).then(function success(result) {
          vm.result = result;
          vm.currentPage = result.page;

          pagination.updateMetainf(
            result.count,
            result.data.length,
            result.page,
            result.pages
          );
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os registros.');
        });
      }
    }

    vm.loadData(pagination.getNextPage());

    vm.path = function(id) {
      if (id > 0) {
        $state.go('home.ensembles.edit', {id: id});
      } else {
        $state.go('home.ensembles.new');        
      }
    }

    vm.pageChanged = function() {
      pagination.setNextPage(vm.result.page);
      vm.loadData(pagination.getNextPage());
    }

    function stringEmpty(str) {
      var pattern = /^\s*$/;
      return (str == null || pattern.test(str));
    };    

    function init() {
      var ctrlName = 'EnsemblesListCtrl';
      pagination = pagination.get(ctrlName);
      vm.pageSize = pagination.getPageSize();
      vm.paginationPageSize = pagination.getPageSize();
      vm.paginationItemsSize = 5;
    }
  }
});