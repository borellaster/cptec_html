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


  /*.run(function ($rootScope, $location) { //Insert in the function definition the dependencies you need.
    $rootScope.$on("$locationChangeStart",function(event, next, current){
        $rootScope.isMap = ($location.$$path == '/home') ? true : false;
    });
  })*/

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

      $rootScope.isAdmin = function (role) {
          if ($rootScope.usuario.profile === 'ADMINISTRADOR') {
              return true;
          }
          return false;
      };

      $rootScope.logout = function () { 
        delete $rootScope.usuario;
        $cookies.remove('usuario');
        delete $http.defaults.headers.common['X-Auth-Token'];
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
          if (originalPath != '/login') {
            //setError('Usuário não autorizado');
          }
        } else {
          if (usuario != undefined) {
            $rootScope.usuario = usuario;
            $http.defaults.headers.common['X-Auth-Token'] = usuario.token;
          }
        } 
      });
  }); 


});