define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('moment');
  require('toastr');

  // angular module definition
  return angular.module(
    // module name
    'pagina.home',

    // module dependencies
    [
      'ui.router'
    ]
  );

});
