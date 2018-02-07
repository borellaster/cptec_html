define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.format', {
        url: '/format',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/format/templates/form.html',
            controller    : 'FormatCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
