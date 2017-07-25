define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ContactCtrl', ContactCtrl);
  ContactCtrl.$inject = ['$state', '$stateParams', '$location', 'ContactFactory'];

  function ContactCtrl($state, params, $location, dataService) {
    var vm = this;  

    vm.send = function(form) {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
            errorField.$setTouched();
            errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        return true;
      }
      dataService.send(vm.contact).then(function success(data) {
        setOk('E-mail enviado com sucesso.');
        vm.clear(form);
      })
      .catch(function error(msg) {
        setError('Erro ao enviar e-mail.');
      });
    }

    vm.clear = function(form) {
      vm.contact = {};
	  form.$setPristine();
      form.$setUntouched();
    }    

  }
});