define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/ensembles', '/ensembles/list'); // default

    $stateProvider
      .state('home.ensembles', {
        url: '/ensembles',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/ensembles/templates/list.html',
            controller    : 'EnsemblesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.ensembles.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/ensembles/templates/list.html',
            controller    : 'EnsemblesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.ensembles.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/ensembles/templates/form.html',
            controller    : 'EnsemblesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.ensembles.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/ensembles/templates/form.html',
            controller    : 'EnsemblesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
