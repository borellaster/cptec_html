define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ReferenceCtrl', ReferenceCtrl);
  ReferenceCtrl.$inject = ['$state', '$stateParams', '$location', '$window'];

  function ReferenceCtrl($state, params, $location, $window) {
    var vm = this;   

	vm.link = function (url){	  
	  $window.open(url);
	}     
  }
});