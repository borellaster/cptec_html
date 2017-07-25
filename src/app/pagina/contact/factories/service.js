define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('ContactFactory', ContactFactory);
  ContactFactory.$inject = ['ContactResource'];

  function ContactFactory(resource) {
    var service = {
    	send: send
    };

    return service;

    function send(mail) {
	    return resource.save(mail).$promise;
    }      

   };
  
});