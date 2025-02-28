define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('RequestsCtrl', RequestsCtrl);

  RequestsCtrl.$inject = ['$state', '$stateParams', '$location', 'RequestsFactory', 'RequestsResource'];
  function RequestsCtrl($state, params, $location, dataService, resource) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $state.go('home.requests.list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar Requests';
        vm.acao = 'incluído';
        vm.requests = new resource({
          'id': undefined
        });        
    } else {        
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.requests = data;
          vm.title = 'Requisição '+vm.requests.id;
          vm.periodo = vm.requests.start_month+'/'+vm.requests.start_year +" até " +
                       vm.requests.end_month+'/'+vm.requests.end_year;
          if(vm.requests.query_type == "CI"){
            vm.tipo = "Por município";
          }else if (vm.requests.query_type == "CO"){
            vm.tipo = "Por ponto";
          }

          vm.variables = vm.requests.variables.replace(/'/g,"");
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

      dataService.save(vm.requests).then(function success(data) {
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