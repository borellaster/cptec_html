define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('UniqueCtrl', UniqueCtrl);

  UniqueCtrl.$inject = ['$state', '$stateParams', '$location', 'UniqueFactory', 'VariablesFactory'];
  function UniqueCtrl($state, params, $location, dataService, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    }); 

    vm.loadData = function () {
        dataService.list(vm.requisicao.longitude,vm.requisicao.latitude, getVariables()).then(function success(result) {
          vm.result = result;          
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os registros.');
        });      
    } 

    function getVariables() {
        return "('OCIS')";
    };               

  }
});