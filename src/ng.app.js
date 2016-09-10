define(function(require) {
  'use strict';

  var angular = require('angular');
  window.ngee = {
    oldLocation: JSON.parse( JSON.stringify(window.location) )
  };

  angular.element(document).ready(startAngularApp);

  function startAngularApp() {
    var module = angular.module(
      'run',
      [
        require('app/core/package').name
      ]
    );
    angular.bootstrap(document, [module.name]);
  }
});