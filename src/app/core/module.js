define(function(require) {
  'use strict';

  var angular = require('angular');

  return angular.module(
    'core',
    [
      require('../admin/package').name,
      require('../pagina/package').name,
      require('./lazy/load/package').name,
      require('./main/package').name,
    ]
  );

});
