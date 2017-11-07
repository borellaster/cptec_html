define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['$state', '$stateParams', '$location', 'UsersFactory', 'UsersResource'];
  function UsersCtrl($state, params, $location, dataService, resource) {
    var vm = this;
    vm.showConfirm = false;
    
    vm.updateLocation = function() {
      $state.go('home.users.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar usuário';
        vm.acao = 'incluído';
        vm.users = new resource({
          'id': undefined,
          'name': '',
          'nickname': '',
          'created_at': new Date()
        });        
    } else {
        vm.title = 'Editar usuário';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.users = data;
          vm.updated_at = new Date();
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    vm.save = function(form) {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
            errorField.$setTouched();
            errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        return true;
      }
      dataService.save(vm.users).then(function success(data) {
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