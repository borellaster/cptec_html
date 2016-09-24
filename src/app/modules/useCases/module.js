define(function(require) {
  'use strict';

  var angular = require('angular');

    return angular.module(
    'useCases',
    [
      require('./bookmarks/package').name,
      require('./countries/package').name
    ]
  );

});
