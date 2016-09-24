define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('uiBootstrap');

  return angular.module(

    'core.main',
    [
      'ui.router',
      'ui.bootstrap',

      require('./templates/cache').name,
      require('shared/fend/progressbar-loading/package').name,
      require('shared/fend/navbar/package').name,

      require('app/core/home/package').name,
      require('app/modules/useCases/countries/package').name
    ]
  );
});