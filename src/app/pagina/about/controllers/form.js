define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('AboutCtrl', AboutCtrl);
  AboutCtrl.$inject = ['$state', '$stateParams', '$location'];

  function AboutCtrl($state, params, $location) {
    var vm = this;    
  }
});