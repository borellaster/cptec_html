define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.visualization', {
        url: '/visualization',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/visualization/templates/form.html',
            controller    : 'VisualizationCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
