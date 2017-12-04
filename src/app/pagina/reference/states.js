define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.reference', {
        url: '/reference',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/reference/templates/form.html',
            controller    : 'ReferenceCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
