define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('CityCtrl', CityCtrl);

  CityCtrl.$inject = ['$state', '$stateParams', '$location', 'UniqueFactory', 'CitiesFactory','VariablesFactory', 'PaginationFactory'];
  function CityCtrl($state, params, $location, dataService, dataServiceCity, dataServiceVariable, pagination) {
    var vm = this;    
    init();

    vm.requisicao = {
      'inicio': new Date(),
      'fim': new Date(),
    }    

    vm.loadCities = function(cidade) {
      if(cidade.length >= 3){
        dataServiceCity.combo(cidade).then(function success(data) {
          vm.cities = data;
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os cidades.');
        });  
      }
    };      

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });     

    vm.loadData = function (page) {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
          errorField.$setTouched();
          errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        return true;
      }   
      dataService.listpag(vm.requisicao.city.longitude,
                          vm.requisicao.city.latitude, 
                          getVariables(),
                          vm.requisicao.inicio, 
                          vm.requisicao.fim,
                          page, 
                          pagination.getPageSize())
      .then(function success(result) {
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

    //-28.263/-52.407/('OCIS')

    function getVariables() {
      var str = "(";
      var values = vm.requisicao.variables;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += ")";      
      
      return str;
    };  

    vm.pageChanged = function() {
      pagination.setNextPage(vm.result.page);
      vm.loadData(pagination.getNextPage());
    }    

    function init() {
      var ctrlName = 'CityCtrl';
      pagination = pagination.get(ctrlName);
      vm.pageSize = pagination.getPageSize();
      vm.paginationPageSize = pagination.getPageSize();
      vm.paginationItemsSize = 5;
      vm.showConfirm = false;
    }                 

  }
});