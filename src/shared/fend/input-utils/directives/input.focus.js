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

  module.filter('propsFilter', propsFilter);
  function propsFilter() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        out = items;
      }

      return out;
    }
  }
  
});
