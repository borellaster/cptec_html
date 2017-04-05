define(function(require) {
  'use strict';

  var module = require('../module');

  module.controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = [
    '$location', '$cookies', '$rootScope', 'LoginFactory', '$http', '$state'
  ];

  function LoginCtrl($location, $cookies, $rootScope, dataService, $http, $state) {
    var vm = this;

    vm.authenticate = function() {
      dataService.authenticate(vm.username,vm.password).then(function success(usuario) {
        $rootScope.usuario = usuario;
        $http.defaults.headers.common['Authorization'] = "JWT "+usuario.token;
        $cookies.put('usuario', JSON.stringify(usuario));     
        $state.go('home');
      }).catch(function error(msg) {
        setError('Usuário ou senha inválidos');
      });
    }    

    vm.esqueceuSenha = function(){
      dataService.forgot(vm.email).then(function success(usuario) {
        $state.go('login');
        setOk('Um email com as instruções de alteração de senha foi enviado para ' + vm.email);        
      }).catch(function error(msg) {
        setError('Email não encontrado');
      });      
    }    
  }
});