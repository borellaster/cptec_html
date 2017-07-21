define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.contact', {
        url: '/contact',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/contact/templates/form.html',
            controller    : 'ContactCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
