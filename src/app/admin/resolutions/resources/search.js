define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ResolutionsSearchResource', ResolutionsSearchResource);
  ResolutionsSearchResource.$inject = ['$resource'];
  
  function ResolutionsSearchResource($resource) {
    var rest = $resource(
      'api/v1/resolutions/search/:page/:size/:name', 
      {
        'page': 1, 'size': 10, 'name': ''
      }
    );
    return rest;
  }

});
