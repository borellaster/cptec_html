define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function configureStates($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider
      .when('', '/home')
      .when('/', '/home')
      .otherwise("/404");

    $stateProvider
      .state('404', {
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