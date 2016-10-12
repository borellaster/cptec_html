define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');

  require('toastr');

  // angular module definition
  return angular.module(
    // module name
    'admin.home',

    // module dependencies
    [
      'ui.router'
    ]
  );

});
