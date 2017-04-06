define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/resolutions', '/resolutions/list'); // default

    $stateProvider
      .state('home.resolutions', {
        url: '/resolutions',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/resolutions/templates/list.html',
            controller    : 'ResolutionsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.resolutions.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/resolutions/templates/list.html',
            controller    : 'ResolutionsListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.resolutions.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/resolutions/templates/form.html',
            controller    : 'ResolutionsCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.resolutions.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/resolutions/templates/form.html',
            controller    : 'ResolutionsCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
