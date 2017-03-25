define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('UniqueCtrl', UniqueCtrl);

  UniqueCtrl.$inject = ['$state', '$stateParams', '$location', 'UniqueFactory', 'VariablesFactory'];
  function UniqueCtrl($state, params, $location, dataService, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    vm.requisicao = {
      'inicio': new Date(),
      'fim': new Date(),
    }

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
      dataService.list(vm.requisicao.longitude,
                       vm.requisicao.latitude, 
                       getVariables(), 
                       vm.requisicao.inicio, 
                       vm.requisicao.fim)
        .then(function success(result) {
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