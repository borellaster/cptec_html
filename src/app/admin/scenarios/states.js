define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/scenarios', '/scenarios/list'); // default

    $stateProvider
      .state('home.scenarios', {
        url: '/scenarios',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/scenarios/templates/list.html',
            controller    : 'ScenariosListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.scenarios.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/scenarios/templates/list.html',
            controller    : 'ScenariosListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.scenarios.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/scenarios/templates/form.html',
            controller    : 'ScenariosCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.scenarios.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/scenarios/templates/form.html',
            controller    : 'ScenariosCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
