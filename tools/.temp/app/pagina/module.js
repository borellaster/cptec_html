define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'pagina',
    [
      require('./home/package').name,
      require('./dashboard/package').name,
      require('./visualization/package').name,
      require('./about/package').name
    ]
  );

});
