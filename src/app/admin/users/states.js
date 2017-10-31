define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/users', '/users/list');

    $stateProvider
      .state('home.users', {
        url: '/users',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/users/templates/list.html',
            controller    : 'UsersListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.users.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/users/templates/list.html',
            controller    : 'UsersListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.users.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/users/templates/form.html',
            controller    : 'UsersCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.users.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/users/templates/form.html',
            controller    : 'UsersCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
