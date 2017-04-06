define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.about', {
        url: '/about',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/about/templates/form.html',
            controller    : 'AboutCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
