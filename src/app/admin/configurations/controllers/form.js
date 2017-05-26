define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ConfigurationsCtrl', ConfigurationsCtrl);

  ConfigurationsCtrl.$inject = ['$state', '$stateParams', '$location', 'ConfigurationsFactory', 'ConfigurationsResource'];
  function ConfigurationsCtrl($state, params, $location, dataService, resource) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $state.go('home.configurations.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar configuração';
        vm.acao = 'incluído';
        vm.configurations = new resource({
          'id': undefined
        });        
    } else {
        vm.title = 'Editar configuração';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.configurations = data;
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    vm.save = function() {
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

      dataService.save(vm.configurations).then(function success(data) {
        vm.updateLocation();
        setOk('Registro '+vm.acao+' com sucesso.');
      })
      .catch(function error(msg) {
        setError('Erro ao salvar o registro.');
      });
    }

    vm.cancel = function() {
        vm.updateLocation();
        vm.showConfirm = false;
    }  

    vm.cancelRemove = function() {
        vm.showConfirm = false;
    }        
    
    vm.remove = function() {
      vm.showConfirm = true;
    }

    vm.delete = function(id) {
      dataService.remove(id).then(function(result) {
        vm.updateLocation();
        setOk('Registro excluído com sucesso.');
      }).catch(function error(msg) {
        setError('Erro ao excluir o registro.');
      });
    } 
  }
});