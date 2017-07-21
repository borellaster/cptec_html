define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('TutorialCtrl', TutorialCtrl);
  TutorialCtrl.$inject = ['$state', '$stateParams', '$location'];

  function TutorialCtrl($state, params, $location) {
    var vm = this;    
  }
});