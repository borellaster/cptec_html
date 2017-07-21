define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ContactCtrl', ContactCtrl);
  ContactCtrl.$inject = ['$state', '$stateParams', '$location'];

  function ContactCtrl($state, params, $location) {
    var vm = this;    
  }
});