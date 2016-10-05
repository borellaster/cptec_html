function getConfig() {
  return {

    // libraries dependencies (fallback support)
    paths: {

      jquery: [
        'vendor/jquery/2.1.3/jquery.min'
      ],

      bootstrap: [
        'vendor/bootstrap/3.3.2/js/bootstrap.min'
      ],


      angular: [
        'vendor/angular.js/1.5.8/angular.min'
      ],

      angularResource: [
        'vendor/angular.js/1.5.8/angular-resource.min'
      ],

      angularAnimate: [
        'vendor/angular.js/1.5.8/angular-animate.min'
      ],

      ocLazyLoad: [
        'vendor/ocLazyLoad/0.5.2/ocLazyLoad.min'
      ],

      uiBootstrap: [
        'vendor/angular-ui/bootstrap/0.12.0/ui-bootstrap-tpls.min'
      ],

      uiRouter: [
        'vendor/angular-ui/ui-router/0.2.13/angular-ui-router.min'
      ],

      toaster: [
        'vendor/toaster/0.3.0/toaster'
      ],

      ngProgress: [
        'vendor/ngProgress/1.0.3/ngProgress.min'
      ],

      angularMocks: [
        'vendor/angular.js/1.5.8/angular-mocks'
      ],

      angularMocksBackend: [
        'vendor/angular-mocks-backend/0.1.7/angular-mocks-backend'
      ],

      lokijs: [
        'vendor/lokijs/1.0.1/lokijs.min'
      ],

      mapBox: [
        'vendor/mapbox/angular-leaflet-directive.min'
      ],     

      leaflet: [
        'vendor/mapbox/leaflet'
      ]      
    },

    // define js scripts dependencies
    shim: {

      'bootstrap': {
        deps: ['jquery']
      },

      'angular': {
        deps: ['bootstrap'],
        exports: 'angular'
      },

      'angularResource': {
        deps: ['angular']
      },

      'angularAnimate': {
        deps: ['angular']
      },

      'uiBootstrap': {
        deps: ['bootstrap',  'angular']
      },

      'uiRouter': {
        deps: ['angular']
      },

      'ocLazyLoad': {
        deps: ['angular']
      },

      'ngProgress': {
        deps: ['angular']
      },

      'toaster': {
        deps:['angularAnimate']
      },

      'angularMocks': {
        deps: ['angular']
      },

      'angularMocksBackend': {
        deps: ['angularMocks']
      },

      'mapBox': {
        deps: ['angular']
      },    

      'leaflet': {
        deps: ['jquery']
      }         
    },

    priority: [
      'angular'
    ],

    deps: null

  };
}