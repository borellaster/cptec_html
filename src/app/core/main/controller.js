define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['MenuConfig', 'LazyLoadService', '$location'];

  function MainCtrl(menu, lazyLoad, $location) {
    var vm = this;

    vm.isLogin = function() {
      var path = $location.path();

      console.log(path);

      return (path.indexOf('login') >= 0);
    }
    
    // lazyLoad
    //   .load(['admin', 'pagina'])
    //   .then(function( results ) {

    //     if(ngee && ngee.oldLocation) {
    //       var urlParts = ngee.oldLocation.href.split('#');
    //       var path = $location.path();
    //       if( urlParts.length > 1 && ( path !== urlParts[1] ) ) {
    //         $location.path( urlParts[1] );
    //       }
    //     }
    //   });
  }
});
