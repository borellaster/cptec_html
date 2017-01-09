define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.unique', {
        url: '/unique',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/unique/templates/form.html',
            controller    : 'UniqueCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
