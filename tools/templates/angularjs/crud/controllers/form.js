define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('<%= helpers.capitalize( name ) %>Ctrl', <%= helpers.capitalize( name ) %>Ctrl);

  <%= helpers.capitalize( name ) %>Ctrl.$inject = [
    '$stateParams', '$location', '<%= helpers.capitalize( name ) %>Factory', '<%= helpers.capitalize( name ) %>Resource'
  ];

  function <%= helpers.capitalize( name ) %>Ctrl(params, $location, dataService, resource) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $location.path('/intranet/<%= name %>/list');
    }

    if(params.id == undefined){
        vm.title = 'Cadastrar <%= helpers.capitalize( name ) %>';
        vm.acao = 'incluído';
        vm.<%= name %> = new resource({
          'id':0 
        });        
    } else {
        vm.title = 'Editar <%= helpers.capitalize( name ) %>';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.<%= name %> = data;
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    vm.save = function() {
      dataService.save(vm.<%= name %>).then(function success(data) {
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