define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/<%= route %>', '/intranet/<%= route %>/list'); // default

    $stateProvider
      .state('intranet.<%= name %>', {
        url: '/<%= route %>',
        views: {
          'content@intranet': {
            templateUrl   : 'app/modules/useCases/<%= name %>/templates/list.html',
            controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('intranet.<%= name %>.list', {
        url: '/list',
        views: {
          'content@intranet': {
            templateUrl   : 'app/modules/useCases/<%= name %>/templates/list.html',
            controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('intranet.<%= name %>.new', {
        url: '/new',
        views: {
          'content@intranet': {
            templateUrl   : 'app/modules/useCases/<%= name %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>Ctrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('intranet.<%= name %>.edit', {
        url: '/edit/:id',
        views: {
          'content@intranet': {
            templateUrl   : 'app/modules/useCases/<%= name %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>Ctrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
