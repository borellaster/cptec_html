define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'useCases',
    [
      require('./countries/package').name
    ]
  );

});
