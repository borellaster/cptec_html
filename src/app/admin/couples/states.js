define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/couples', '/couples/list'); // default

    $stateProvider
      .state('home.couples', {
        url: '/couples',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/couples/templates/list.html',
            controller    : 'CouplesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.couples.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/couples/templates/list.html',
            controller    : 'CouplesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.couples.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/couples/templates/form.html',
            controller    : 'CouplesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.couples.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/couples/templates/form.html',
            controller    : 'CouplesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
