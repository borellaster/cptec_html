define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/<%= route %>', '/<%= route %>/list'); // default

    $stateProvider
      .state('home.<%= name %>', {
        url: '/<%= route %>',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/<%= name %>/templates/list.html',
            controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.<%= name %>.list', {
        url: '/list',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/<%= name %>/templates/list.html',
            controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.<%= name %>.new', {
        url: '/new',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/<%= name %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>Ctrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('home.<%= name %>.edit', {
        url: '/edit/:id',
        views: {
          'content@home': {
            templateUrl   : 'app/admin/<%= name %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>Ctrl',
            controllerAs  : 'vm'
          }
        }
      });
  }

});
