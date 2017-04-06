define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('CouplesResource', CouplesResource);
  CouplesResource.$inject = ['$resource'];
  function CouplesResource($resource) {
    var rest = $resource(
      'api/v1/couples/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('CouplesPaginationResource', CouplesPaginationResource);
  CouplesPaginationResource.$inject = ['$resource'];
  function CouplesPaginationResource($resource) {
    var rest = $resource(
      'api/v1/couples/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }

  module.factory('CouplesComboResource', CouplesComboResource);
  CouplesComboResource.$inject = ['$resource'];
  function CouplesComboResource($resource) {
    var rest = $resource(
      'api/v1/public/couples', {}
    );
    return rest;
  }        

});
