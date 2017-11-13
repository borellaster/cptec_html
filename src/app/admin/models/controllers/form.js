define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ModelsCtrl', ModelsCtrl);

  ModelsCtrl.$inject = ['$state', '$stateParams', '$location', 'ModelsFactory', 'ModelsResource'];
  function ModelsCtrl($state, params, $location, dataService, resource) {
    var vm = this;
    vm.showConfirm = false;
    vm.situacoes = dataService.getArraySituacao();

    vm.updateLocation = function() {
      $state.go('home.models.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar modelo';
        vm.acao = 'incluído';
        vm.models = new resource({
          'id': undefined
        });        
    } else {
        vm.title = 'Editar modelo';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.models = data;
          angular.forEach(vm.situacoes, function(value, key) {
            if(value.val == vm.models.correct_days){
              vm.models.correctobj = value;
            }
          });          
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    vm.save = function(form) {
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
      vm.models.correct_days = vm.models.correctobj.val;
      dataService.save(vm.models).then(function success(data) {
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