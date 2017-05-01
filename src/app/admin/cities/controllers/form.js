define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('CitiesCtrl', CitiesCtrl);

  CitiesCtrl.$inject = ['$state', '$stateParams', '$location', 'CitiesFactory', 'CitiesResource', 'StatesFactory'];
  function CitiesCtrl($state, params, $location, dataService, resource, dataServiceState) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $state.go('home.cities.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar cidade';
        vm.acao = 'incluído';
        vm.cities = new resource({
          'id': undefined
        });        
    } else {
        vm.title = 'Editar cidade';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.cities = data;
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    dataServiceState.combo().then(function success(data) {
      vm.states = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar países.')
    });     

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
      vm.cities.state_id = vm.cities.state.id;
      dataService.save(vm.cities).then(function success(data) {
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