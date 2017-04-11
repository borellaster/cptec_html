function getConfig() {
  return {

    // libraries dependencies (fallback support)
    paths: {

      jquery: [
        'vendor/jquery/2.1.3/jquery.min'
      ],

      ngLocale: [
        'vendor/angular.js/1.5.8/i18n/angular-locale_pt-br'
      ],      

      jqueryUi: [
        'vendor/jquery/ui/jqueryui-1.10.3.min'     
      ],       

      bootstrap: [
        'vendor/bootstrap/3.3.2/js/bootstrap.min'
      ],

      angular: [
        'vendor/angular.js/1.5.8/angular.min'
      ],

      ngCookies: [
        'vendor/angular.js/1.5.8/angular-cookies.min'
      ],      

      ngSanitize: [
        'vendor/angular.js/1.5.8/angular-sanitize.min'
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
        'vendor/angularui/bootstrap/0.12.0/ui-bootstrap-tpls.min'
      ],

      uiRouter: [
        'vendor/angular-ui/ui-router/0.2.13/angular-ui-router.min'
      ],

      uiSelect: [
        'vendor/angular-ui/ui-select/select.min'
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

      ngLeaflet: [
        'vendor/leaflet/angular-leaflet-directive.min'
      ],     

      leaflet: [
        'vendor/leaflet/leaflet'
      ],

      leafletDraw: [
        'vendor/leaflet/leaflet.draw'
      ],      

      toastr: [
        'vendor/toaster/new/toastr'
      ],

      moment: [
        'vendor/moment/moment.min'
      ],

      dualList: [
        'vendor/duallist/ngduallist'
      ],

      jqueryValidate: [
        'vendor/jquery-validation/dist/jquery.validate'
      ],

      jquerySteps: [
        'vendor/jquery-steps/js/jquery.steps.min'
      ],

      jqueryWizard: [
        'vendor/jquery-bootstrap-wizard/jquery.bootstrap.wizard'
      ],

      formWizard: [
        'vendor/form-wizard'
      ]
    },

    // define js scripts dependencies
    shim: {

      'bootstrap': {
        deps: ['jquery']
      },

      'jqueryUi': {
          deps: ['jquery']
      }, 

      'ngLocale': {
        deps: ['angular']
      },           

      'angular': {
        deps: ['bootstrap'],
        exports: 'angular'
      },

      'ngCookies': {
          deps: ['angular']
      },      

      'ngSanitize': {
        deps: ['angular']
      },      

      'angularResource': {
        deps: ['angular']
      },

      'angularAnimate': {
        deps: ['angular']
      },

      'uiBootstrap': {
        deps: ['bootstrap', 'angular', 'jqueryUi']
      },

      'uiRouter': {
        deps: ['angular']
      },

      'ocLazyLoad': {
        deps: ['angular']
      },

      'dualList': {
        deps: ['angular']
      },      

      'uiSelect': {
        deps: ['angular']
      },

      'toastr': {
          deps: ['jquery'],
          exports: 'toastr'
      },  

      'angularMocks': {
        deps: ['angular']
      },

      'angularMocksBackend': {
        deps: ['angularMocks']
      },

      'ngLeaflet': {
        deps: ['angular']
      },    

      'leaflet': {
        deps: ['jquery']
      },

      'leafletDraw': {
        deps: ['jquery','leaflet']
      }, 

      'jqueryValidate': {
        deps: ['jquery'],
        exports: 'jqueryValidate'
      }, 

      'jquerySteps': {
        deps: ['jquery'],
        exports: 'jquerySteps'
      }, 

      'jqueryWizard': {
        deps: ['jquery','bootstrap'],
        exports: 'jqueryWizard'
      }, 

      'formWizard': {
        deps: ['jquery', 'jqueryValidate', 'jquerySteps', 'jqueryWizard'],
        exports: 'formWizard'
      },  

      'moment': {
        deps: ['jquery'],
        exports: 'moment'
      }               
    },

    priority: [
      'angular'
    ],

    deps: null

  };
}