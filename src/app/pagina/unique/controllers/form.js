define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('UniqueCtrl', UniqueCtrl);

  UniqueCtrl.$inject = ['$state', '$stateParams', '$location', 'VariablesFactory'];
  function UniqueCtrl($state, params, $location, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });       

  }
});