define(function(require) {
  'use strict';

  var module = require('../module');

  require('../resources/rest');
  module.controller('CountriesListCtrl', CountriesListCtrl);

  CountriesListCtrl.$inject = [
    '$location', 'PaginationFactory', 'CountriesSearchResource', 'CountriesFactory'
  ];

  function CountriesListCtrl($location, pagination, ResourceSearch, dataService) {
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
        dataService.search(vm.searchFilter, page, pagination.getPageSize()).then(function success(result) {
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

    vm.center = {
        lat: -17.518344,
        lng: -52.207031,
        zoom: 4
    };  
    
    vm.legend = {
        position: 'bottomleft',
        colors: ['#FFFF00', '#FF0000', '#FF0000', '#FF0000'],
        labels: ['Soja voluntária', '1-9 ocorrências', '10-99 ocorrências', '> 99 ocorrências']
    };   
    
    vm.tiles = {
        name: 'Mapbox Park',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ',
            mapid: 'feelcreative.llm8dpdk'
        }
    }; 
    
    vm.markers = new Array();          
  }
});