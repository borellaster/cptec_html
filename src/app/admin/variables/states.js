define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/variables', '/variables/list'); // default

    $stateProvider
      .state('home.variables', {
        url: '/variables',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/variables/templates/list.html',
            controller    : 'VariablesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.variables.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/variables/templates/list.html',
            controller    : 'VariablesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.variables.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/variables/templates/form.html',
            controller    : 'VariablesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.variables.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/variables/templates/form.html',
            controller    : 'VariablesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
