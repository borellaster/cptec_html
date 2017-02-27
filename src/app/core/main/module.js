define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('uiBootstrap');
  require('ngLeaflet');
  require('leaflet');  
  require('leafletDraw');
  require('ngSanitize');
  require('ngLocale');
  require('dualList');

  return angular.module(

    'core.main',
    [
      'ui.router',
      'ui.bootstrap',
      'leaflet-directive',
      'ngSanitize',
      'ngLocale',
      'ng-duallist',

      require('./templates/cache').name,
      require('shared/fend/navbar/package').name,
      require('shared/fend/tema/package').name
    ]
  ).run(function ($rootScope, $location) { //Insert in the function definition the dependencies you need.
    $rootScope.$on("$locationChangeStart",function(event, next, current){
        $rootScope.isMap = ($location.$$path == '/home') ? true : false;
    });
  });
});