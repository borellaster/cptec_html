define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureLazyLoad);

  configureLazyLoad.$inject = ['$ocLazyLoadProvider'];

  function configureLazyLoad($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      loadedModules: [
        module.name,
        require('app/core/main/package').name,
      ],
      asyncLoader: require
    });

  }

});
