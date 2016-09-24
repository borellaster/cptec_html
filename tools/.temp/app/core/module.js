define(function(require) {
  'use strict';

  var angular = require('angular');

  // angular module definition
  return angular.module(
    // module name
    'core',
    
    // module dependencies
    [
      require('./lazy/load/package').name,
      require('./main/package').name,
      require('./home/package').name,
      require('../modules/useCases/countries/package').name
    ]
  );

});
