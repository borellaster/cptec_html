define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('uiBootstrap');
  require('mapBox');
  require('leaflet');  
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
      // require('shared/fend/progressbar-loading/package').name,
      require('shared/fend/navbar/package').name,
      require('shared/fend/tema/package').name
    ]
  ).run(function ($rootScope, $location) { //Insert in the function definition the dependencies you need.
    //Do your $on in here, like this:
    $rootScope.$on("$locationChangeStart",function(event, next, current){
        //Do your things
        $rootScope.isMap = ($location.$$path == '/home') ? true : false;
    });
  });
});