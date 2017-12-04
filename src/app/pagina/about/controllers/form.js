define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('AboutCtrl', AboutCtrl);
  AboutCtrl.$inject = ['$state', '$stateParams', '$location', '$window'];

  function AboutCtrl($state, params, $location, $window) {
    var vm = this;    

	vm.link = function (url){	  
	  $window.open(url);
	}     
  }
});