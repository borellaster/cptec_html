define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ForgotResource', ForgotResource);
  ForgotResource.$inject = ['$resource'];

  function ForgotResource($resource) {

    var rest = $resource(
      'api/v1/forgot', {},
      {
        'forgot': { 'method': 'GET' }
      }      
    );
    return rest;
  }
});