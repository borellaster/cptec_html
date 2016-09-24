define(function(require) {
  'use strict';

  var angular = require('angular');

  return angular.module(
    'core',
    [
      require('./lazy/load/package').name,
      require('./main/package').name,
      require('./home/package').name,
      require('../modules/useCases/countries/package').name
    ]
  );

});
