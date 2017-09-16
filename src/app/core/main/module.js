define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');
  require('uiBootstrap');
  require('ngLeaflet');
  require('leaflet');  
  require('leafletDraw');
  require('ngSanitize');
  require('ngLocale');
  require('dualList');
  require('ngCookies');
  require('formWizard');
  require('clipboard');

  return angular.module(

    'core.main',
    [
      'ui.router',
      'ui.bootstrap',
      'leaflet-directive',
      'ngSanitize',
      'ngLocale',
      'ngCookies',
      'ng-duallist',      

      require('./templates/cache').name,
      require('shared/fend/navbar/package').name,
      require('shared/fend/tema/package').name
    ]
  )


  //operacoes do usuario
  .run(function ($rootScope, $http, $state, $cookies) {
      $rootScope.hasRole = function (role) {
          if ($rootScope.usuario === undefined) {
              return false;
          }

          if ($rootScope.usuario.authorities === undefined) {
              return false;
          }

          for (var i = 0; i < $rootScope.usuario.authorities.length; i++) {
              if ($rootScope.usuario.authorities[i].authority == role)
                  return true;
          }
          return false;
      };

      $rootScope.isLogged = function (role) {
          if ($cookies.get('usuario') != undefined) {
              return true;
          }
          return false;
      };

      $rootScope.logout = function () { 
        delete $rootScope.usuario;
        $cookies.remove('usuario');
        delete $http.defaults.headers.common['Authorization'];
        $state.go('login');
      };
  })
  //monitora as mudanças de rotas
  .run(function ($rootScope, $http, $cookies, $location) {
      $rootScope.$on('$locationChangeStart', function (event) {
        var originalPath = $location.path();  
        if ($cookies.get('usuario') != undefined) var usuario = JSON.parse($cookies.get('usuario'));
        if (usuario == undefined && originalPath.substring(0, 6) == '/admin') {
          $location.path("login");
        } else {
          if (usuario != undefined) {
            $rootScope.usuario = usuario;            
            $http.defaults.headers.common['Authorization'] = "JWT "+usuario.token;
          }
        } 
      });
  }); 


});