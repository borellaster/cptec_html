define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('StatesSearchResource', StatesSearchResource);

  //---

  StatesSearchResource.$inject = ['$resource'];

  function StatesSearchResource($resource) {

    var rest = $resource(
      'rest/states/search/:name'
    );

    return rest;

  }

});
