define(function(require) {
  'use strict';

  var module = require('./module');
  module.controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl() {
    var vm = this;

    vm.pageName = 'Home Page';

  }

});
