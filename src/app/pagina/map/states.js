define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.map', {
        url: '/map',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/map/templates/form.html',
            controller    : 'MapCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
