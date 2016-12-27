define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('StatesCtrl', StatesCtrl);

  StatesCtrl.$inject = ['$state', '$stateParams', '$location', 'StatesFactory', 'StatesResource', 'CountriesFactory'];
  function StatesCtrl($state, params, $location, dataService, resource, dataServiceCountry) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $state.go('home.states.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar estado';
        vm.acao = 'incluído';
        vm.states = new resource({
          'id': undefined
        });        
    } else {
        vm.title = 'Editar estado';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.states = data;
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    dataServiceCountry.combo().then(function success(data) {
      vm.countries = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar países.')
    });     

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
      vm.states.country_id = vm.states.country.id;
      dataService.save(vm.states).then(function success(data) {        
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