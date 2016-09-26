function getConfig() {
  return {

    paths: {

      jquery: [
        'vendor/global/js/jquery-1.10.2.min'
      ],    

      jqueryUi: [
        'vendor/global/js/jquery-ui'
      ],  

      jqueryMigrate: [
        'vendor/global/js/jquery-migrate-1.2.1.min'
      ],

      bootstrap: [
        'vendor/global/vendors/bootstrap/js/bootstrap.min'
      ],

      html5shiv: [
        'vendor/global/js/html5shiv'
      ],

      respond: [
        'vendor/global/js/respond.min'
      ],

      metisMenu: [
        'vendor/global/vendors/metisMenu/jquery.metisMenu'
      ],

      slimscroll: [
        'vendor/global/vendors/slimScroll/jquery.slimscroll'
      ],   

      icheck: [
        'vendor/global/vendors/iCheck/icheck.min'
      ],       

      icheckCustom: [
        'vendor/global/vendors/iCheck/custom.min'
      ],  

      bootstrapHover: [
        'vendor/global/vendors/bootstrap-hover-dropdown/bootstrap-hover-dropdown'
      ],

      jqueryCookie: [
        'vendor/global/assets/vendors/jquery-cookie/jquery.cookie'
      ],

      bootstrapDatePaginator: [
        'vendor/global/assets/vendors/bootstrap-datepaginator/moment'
      ],

      jqueryDataTables: [
        'vendor/global/assets/vendors/DataTables/media/js/jquery.dataTables'
      ],

      jqueryFlot: [
        'vendor/global/assets/vendors/flot-chart/jquery.flot'
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
      ]

    },

    shim: {

      'bootstrap': {
        deps: ['jquery','jqueryUi', 'jqueryMigrate','bootstrapHover','html5shiv','respond','metisMenu','slimscroll','icheck','icheckCustom','jqueryCookie','bootstrapDatePaginator','jqueryDataTables','jqueryFlot']
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


      // @begin: mock js shim/deps
      'angularMocks': {
        deps: ['angular']
      },

      'angularMocksBackend': {
        deps: ['angularMocks']
      }
      // @end: mock js shim/deps

    },

    priority: [
      'angular'
    ],

    deps: null

  };
}
