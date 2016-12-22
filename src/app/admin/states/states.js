define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/states', '/states/list'); // default

    $stateProvider
      .state('home.states', {
        url: '/states',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/states/templates/list.html',
            controller    : 'StatesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.states.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/states/templates/list.html',
            controller    : 'StatesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.states.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/states/templates/form.html',
            controller    : 'StatesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.states.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/states/templates/form.html',
            controller    : 'StatesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
