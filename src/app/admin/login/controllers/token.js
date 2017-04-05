define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('TokenCtrl', TokenCtrl);

  TokenCtrl.$inject = [
    '$state', 'UsuariosFactory', '$stateParams'
  ];

  function TokenCtrl($state, dataService, params) {
    var vm = this;    

    dataService.findByToken(params.id).then(function success(data) {
       vm.usuario = data;
    }).catch(function error(msg) {
      state.go('login');
      setError(msg);
    });

    vm.save = function() {
      vm.password.token = params.id;
      if (vm.password.novaSenha == vm.password.confirmaNovaSenha) {
        if(vm.password.novaSenha.length >= 6){
          dataService.recover(vm.password).then(function success(data) {
            $state.go('login');
            setOk('Senha alterada com sucesso.');
          })
          .catch(function error(msg) {
            setError(msg);
          });
        }else{
          toastr.error('As senhas devem conter no mínimo 6 dígitos.', 'Erro');  
        }
      } else {
        toastr.error('As senhas informadas devem ser iguais.', 'Erro');
      }
    };    
   }
});