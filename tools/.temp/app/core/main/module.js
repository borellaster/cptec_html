define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('uiBootstrap');
  require('mapBox');
  require('leaflet');

  return angular.module(

    'core.main',
    [
      'ui.router',
      'ui.bootstrap',
      'leaflet-directive',

      require('./templates/cache').name,
      require('shared/fend/progressbar-loading/package').name,
      require('shared/fend/navbar/package').name,

      require('app/core/home/package').name,
      require('../../modules/useCases/countries/package').name

    ]
  );
});