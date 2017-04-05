define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('LoginResource', LoginResource);
  LoginResource.$inject = ['$resource'];

  function LoginResource($resource) {

    var rest = $resource(
      'api/v1/autentication', {},  
      {
        authenticate: {
          method: 'POST',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        },
      }
    );

    return rest;

  }

});
