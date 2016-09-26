define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/countries', '/countries/list');

    $stateProvider
      .state('countries', {
        abstract: true,
        url: '/countries',
        views: {
          'master': {
            templateUrl   : 'app/core/main/templates/layout.html'
          }
        }
      })
      .state('countries.list', {
        url: '/list',
        views: {
          'content@countries': {
            templateUrl   : 'app/modules/useCases/countries/templates/list.html',
            controller    : 'CountriesListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('countries.new', {
        url: '/new',
        views: {
          'content@countries': {
            templateUrl   : 'app/modules/useCases/countries/templates/form.html',
            controller    : 'CountriesCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('countries.edit', {
        url: '/edit/:id',
        views: {
          'content@countries': {
            templateUrl   : 'app/modules/useCases/countries/templates/form.html',
            controller    : 'CountriesCtrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
