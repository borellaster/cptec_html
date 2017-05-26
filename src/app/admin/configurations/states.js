define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/configurations', '/configurations/list'); // default

    $stateProvider
      .state('home.configurations', {
        url: '/configurations',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/configurations/templates/list.html',
            controller    : 'ConfigurationsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.configurations.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/configurations/templates/list.html',
            controller    : 'ConfigurationsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.configurations.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/configurations/templates/form.html',
            controller    : 'ConfigurationsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.configurations.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/configurations/templates/form.html',
            controller    : 'ConfigurationsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
