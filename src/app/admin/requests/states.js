define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/requests', '/requests/list'); // default

    $stateProvider
      .state('home.requests', {
        url: '/requests',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/requests/templates/list.html',
            controller    : 'RequestsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.requests.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/requests/templates/list.html',
            controller    : 'RequestsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.requests.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/requests/templates/form.html',
            controller    : 'RequestsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.requests.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/requests/templates/form.html',
            controller    : 'RequestsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
