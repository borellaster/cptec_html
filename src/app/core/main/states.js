define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function configureStates($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider
      .when('', '/dashboard')
      .when('/', '/dashboard')
      .otherwise("/404");

    $stateProvider
      .state('pagina', {
        views: {
          'master': {
            templateUrl   : 'app/core/main/templates/layout-pagina.html'
          }
        }
      }).state('home', {
        url: '/admin',
        views: {
          'master': {
            templateUrl   : 'app/core/main/templates/layout.html'
          }
        }
      }).state('404', {
        url: '/404',
        views: {
          'master': {
            templateUrl   : 'app/core/main/templates/layout.html'
          },

          'content@404': {
            templateUrl   : 'app/core/main/templates/404.html'
          }
        }
      });
  }
});