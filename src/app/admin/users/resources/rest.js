define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('UsersResource', UsersResource);
  UsersResource.$inject = ['$resource'];
  function UsersResource($resource) {
    var rest = $resource(
      'api/v1/users/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );
    return rest;
  }

  module.factory('UsersPaginationResource', UsersPaginationResource);
  UsersPaginationResource.$inject = ['$resource'];
  function UsersPaginationResource($resource) {
    var rest = $resource(
      'api/v1/users/:page/:size', 
      {
        'page': 1, 'size': 10
      }
    );
    return rest;
  }  

  module.factory('UsersComboResource', UsersComboResource);
  UsersComboResource.$inject = ['$resource'];
  function UsersComboResource($resource) {
    var rest = $resource(
      'api/v1/public/users', {}
    );
    return rest;
  }    

});
