define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.dashboard', {
        url: '/dashboard',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/dashboard/templates/form.html',
            controller    : 'DashboardCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
