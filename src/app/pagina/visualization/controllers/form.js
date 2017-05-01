define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('VisualizationCtrl', VisualizationCtrl);
  VisualizationCtrl.$inject = ['$state', '$stateParams', '$location'];
  function VisualizationCtrl($state, params, $location) {
    var vm = this; 
    init();   


    function init() {

    }

  }
});