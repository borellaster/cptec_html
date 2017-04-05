define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('LoginFactory', LoginFactory);

  LoginFactory.$inject = [
    'LoginResource', 'ForgotResource'
  ];    

  function LoginFactory(resource, resourceForgot) {

    var service = {
      authenticate: authenticate,
      forgot : forgot
    };    

    return service;

    function authenticate(username, password){
        return resource.authenticate($.param({'username': username, 'password': password})).$promise;        
    }    

    function forgot(email){
        return resourceForgot.forgot({'email': email}).$promise;        
    }     
  };
});