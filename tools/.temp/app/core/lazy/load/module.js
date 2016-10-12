define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('ocLazyLoad');

  return angular.module(
    'core.lazy.load',
    [
      'ui.router',
      'oc.lazyLoad'
    ]
  );

});
