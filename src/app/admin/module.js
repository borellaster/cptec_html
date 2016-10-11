define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'admin',
    [
      require('./home/package').name,
      require('./countries/package').name
    ]
  );

});