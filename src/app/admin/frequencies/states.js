define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/frequencies', '/frequencies/list'); // default

    $stateProvider
      .state('home.frequencies', {
        url: '/frequencies',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/frequencies/templates/list.html',
            controller    : 'IntervalsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.frequencies.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/frequencies/templates/list.html',
            controller    : 'IntervalsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.frequencies.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/frequencies/templates/form.html',
            controller    : 'IntervalsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.frequencies.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/frequencies/templates/form.html',
            controller    : 'IntervalsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
