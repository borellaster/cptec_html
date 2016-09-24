define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('HelpCtrl', HelpCtrl);

  HelpCtrl.$inject = ['githubUser'];

  function HelpCtrl(githubUser) {
    var vm = this;

    vm.pageName = 'Help Page';
    vm.githubUser = githubUser;

  }

});
