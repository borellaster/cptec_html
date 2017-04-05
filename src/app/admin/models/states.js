define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/models', '/models/list'); // default

    $stateProvider
      .state('home.models', {
        url: '/models',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/models/templates/list.html',
            controller    : 'ModelsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.models.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/models/templates/list.html',
            controller    : 'ModelsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.models.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/models/templates/form.html',
            controller    : 'ModelsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.models.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/models/templates/form.html',
            controller    : 'ModelsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
