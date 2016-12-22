define(function(require) {
  'use strict';

  var module = require('../module');

  require('../resources/rest');
  module.controller('CountriesListCtrl', CountriesListCtrl);

  CountriesListCtrl.$inject = [
    '$q','$location', 'PaginationFactory', 'CountriesSearchResource', 'CountriesFactory'
  ];

  function CountriesListCtrl($q, $location, pagination, ResourceSearch, dataService) {
    var vm = this;
    init();

    vm.loadData = function (page) {
      if(stringEmpty(vm.searchFilter)) {
        dataService.list(page, pagination.getPageSize()).then(function success(result) {
          vm.result = result;
          vm.currentPage = result.page;

          pagination.updateMetainf(
            result.count,
            result.length,
            result.page,
            result.pages
          );
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os registros.');
        });        
      }else{
        dataService.search(vm.searchFilter, page, pagination.getPageSize()).then(function success(result) {
          vm.result = result;
          vm.currentPage = result.page;

          pagination.updateMetainf(
            result.count,
            result.length,
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
        $location.path('/countries/edit/' + id);
      } else {
        $location.path('/countries/new');
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
      var ctrlName = 'CountriesListCtrl';
      pagination = pagination.get(ctrlName);
      vm.pageSize = pagination.getPageSize();
      vm.paginationPageSize = pagination.getPageSize();
      vm.paginationItemsSize = 5;
    }         
  }
});