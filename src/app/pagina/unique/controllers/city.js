define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('CityCtrl', CityCtrl);

  CityCtrl.$inject = ['$state', '$stateParams', '$location', 'UniqueFactory', 'CitiesFactory','VariablesFactory'];
  function CityCtrl($state, params, $location, dataService, dataServiceCity, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    dataServiceCity.list(1,99).then(function success(data) {
      vm.cities = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar cidades.')
    }); 

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });     

    vm.loadData = function () {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
          console.log(errorField)
            errorField.$setTouched();
            errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        return true;
      }      
      dataService.list(vm.city.longitude,vm.city.latitude, getVariables()).then(function success(result) {
        vm.result = result;          
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
      console.log(str);
      
      return str;
    };               

  }
});