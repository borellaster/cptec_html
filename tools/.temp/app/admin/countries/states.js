define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/countries', '/countries/list');

    $stateProvider
      .state('home.countries', {
        url: '/countries',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/countries/templates/list.html',
            controller    : 'CountriesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.countries.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/countries/templates/list.html',
            controller    : 'CountriesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.countries.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/countries/templates/form.html',
            controller    : 'CountriesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.countries.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/countries/templates/form.html',
            controller    : 'CountriesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
