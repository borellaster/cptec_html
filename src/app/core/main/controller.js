define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['ProgressConfig', 'MenuConfig', 'LazyLoadService', '$location'];

  function MainCtrl(progressConfig, menu, lazyLoad, $location) {
    var vm = this;

    progressConfig.eventListeners();
    progressConfig.color('#428bca');
    progressConfig.height('3px');
    
    lazyLoad
      .load(['pages', 'useCases'])
      .then(function( results ) {

        if(ngee && ngee.oldLocation) {
          var urlParts = ngee.oldLocation.href.split('#');
          var path = $location.path();
          if( urlParts.length > 1 && ( path !== urlParts[1] ) ) {
            $location.path( urlParts[1] );
          }
        }
      });
  }
});
