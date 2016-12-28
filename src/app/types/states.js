define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/types', '/types/list'); // default

    $stateProvider
      .state('home.types', {
        url: '/types',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/types/templates/list.html',
            controller    : 'TypesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.types.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/types/templates/list.html',
            controller    : 'TypesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.types.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/types/templates/form.html',
            controller    : 'TypesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.types.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/types/templates/form.html',
            controller    : 'TypesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
