define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'master': {
            templateUrl   : 'app/admin/login/templates/login.html',
            controller    : 'LoginCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('forgot', {
        url: '/forgot',
        views: {
          'master': {
            templateUrl   : 'app/admin/login/templates/forgot.html',
            controller    : 'LoginCtrl',
            controllerAs  : 'vm'
          }
        }
      })

      .state('token', {
        url: '/token/:id',
        views: {
          'master': {
            templateUrl   : 'app/admin/login/templates/token.html',
            controller    : 'TokenCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
