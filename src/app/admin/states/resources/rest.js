define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesResource', StatesResource);

  //---

  StatesResource.$inject = ['$resource'];

  function StatesResource($resource) {

    var rest = $resource(
      'rest/states/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );

    return rest;

  }

});
