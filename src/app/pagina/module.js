define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'pagina',
    [
      require('./home/package').name
    ]
  );

});