define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/cities', '/cities/list'); // default

    $stateProvider
      .state('home.cities', {
        url: '/cities',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/cities/templates/list.html',
            controller    : 'CitiesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.cities.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/cities/templates/list.html',
            controller    : 'CitiesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.cities.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/cities/templates/form.html',
            controller    : 'CitiesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.cities.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/cities/templates/form.html',
            controller    : 'CitiesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
