define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularResource');

  require('uiRouter');
  require('uiBootstrap');

  // angular module definition
  return angular.module(
    // module name
    'admin.configurations',

    // module dependencies
    [
      'ngResource',

      'ui.router',
      'ui.bootstrap',

      require('shared/fend/input-utils/package').name,
      require('shared/fend/pagination/package').name,

    ]
  );

});
