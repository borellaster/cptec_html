define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.home', {
        url: '/home',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/home/template.html',
            controller    : 'PaginaHomeCtrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
