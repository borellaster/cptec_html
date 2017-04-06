define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/intervals', '/intervals/list'); // default

    $stateProvider
      .state('home.intervals', {
        url: '/intervals',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/intervals/templates/list.html',
            controller    : 'IntervalsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.intervals.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/intervals/templates/list.html',
            controller    : 'IntervalsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.intervals.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/intervals/templates/form.html',
            controller    : 'IntervalsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.intervals.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/intervals/templates/form.html',
            controller    : 'IntervalsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
