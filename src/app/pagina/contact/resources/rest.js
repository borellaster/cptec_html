define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ContactResource', ContactResource);
  ContactResource.$inject = ['$resource'];
  function ContactResource($resource) {
    var rest = $resource(
      'api/v1/public/mails',
      {
        
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

});
