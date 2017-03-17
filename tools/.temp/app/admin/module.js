define(function(require) {
  'use strict';

  var angular = require('angular');

    require('uiSelect');

    return angular.module(
    'admin',  
    [
      'ui.select',
      
      require('./home/package').name,
      require('./countries/package').name,
      require('./states/package').name,
      require('./cities/package').name,
      require('./types/package').name,
      require('./variables/package').name
    ]
  );

});
