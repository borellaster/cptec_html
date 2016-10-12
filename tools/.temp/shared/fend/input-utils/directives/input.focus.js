define(function(require) {
  'use strict';

  var module = require('../module');

  module.directive('focus', focus);

  //---
  function focus() {
    return {
      link: function(scope, element, attr) {
        element[0].focus();
      }
    }
  }
});
