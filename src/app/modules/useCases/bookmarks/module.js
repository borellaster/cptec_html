define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularResource');

  require('uiRouter');
  require('uiBootstrap');

  return angular.module(
    'bookmarks',
    [
      'ngResource',

      'ui.router',
      'ui.bootstrap',

      require('shared/fend/input-utils/package').name,
      require('shared/fend/pagination/package').name
    ]
  );

});
