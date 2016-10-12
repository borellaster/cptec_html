define(function(require) {
  'use strict';

  var module = require('./module');

  module.factory('LazyLoadService', LazyLoadService);

  LazyLoadService.$inject = ['$q', '$ocLazyLoad', '$state'];

  function LazyLoadService($q, ocLazyLoad, $state) {

    var service = {
      load: lazyLoad,
      state: lazyStateLoad
    };

    return service;

    function lazyLoad(toLoad) {
      if(angular.isArray(toLoad)) {
        return loadAll(toLoad);
      } else {
        return loadOne(toLoad);
      }

    }

    function loadAll(toLoadArray) {
      var promises = [];
      angular.forEach(toLoadArray, function createPromise(value) {
        this.push(loadOne(value));
      }, promises);
      return $q.all(promises);
    }

    function loadOne(toLoad, returnName) {
      var promise = null;
      var name = null;
      if(angular.isString(toLoad)) {
        name = toLoad;
        promise = load(toLoad);

      } else if(angular.isObject(toLoad)) {

        name = toLoad.name;
        promise = load(toLoad.name, toLoad.path);
      }

      if(returnName) {

        promise = promise.then(function() {
          return name;
        });

      }

      return promise;

    }

    function load(name, path) {

      path = path || 'app/';
      var packageFile = path + name + '/package';

      return ocLazyLoad.load({
        name: name,
        files: [ packageFile ] 
      });

    }

 

    function lazyStateLoad(toLoad) {

      return loadOne(toLoad, true)
        .then(function(gotoState) { 
          return $state.go(gotoState);
        });

    }

  }

});
