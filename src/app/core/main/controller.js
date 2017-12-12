define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['MenuConfig', 'LazyLoadService', '$location'];

  function MainCtrl(menu, lazyLoad, $location) {
    var vm = this;

    vm.isLogin = function() {
      var path = $location.path();
      return (path.indexOf('login') >= 0);
    }
  }
});
