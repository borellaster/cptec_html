define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.tutorial', {
        url: '/tutorial',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/tutorial/templates/form.html',
            controller    : 'TutorialCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
