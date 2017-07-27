define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/modelfreqs', '/modelfreqs/list'); // default

    $stateProvider
      .state('home.modelfreqs', {
        url: '/modelfreqs',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/modelfreqs/templates/list.html',
            controller    : 'ModelfreqsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.modelfreqs.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/modelfreqs/templates/list.html',
            controller    : 'ModelfreqsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.modelfreqs.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/modelfreqs/templates/form.html',
            controller    : 'ModelfreqsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.modelfreqs.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/modelfreqs/templates/form.html',
            controller    : 'ModelfreqsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
