define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'pagina',
    [
      require('./home/package').name,
      //require('./unique/package').name,
      require('./dashboard/package').name,
      require('./about/package').name
      //require('./map/package').name
    ]
  );

});
