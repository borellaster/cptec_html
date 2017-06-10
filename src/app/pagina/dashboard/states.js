define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.dashboard', {
        url: '/dashboard',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/dashboard/templates/form.html',
            controller    : 'DashboardCtrl',
            controllerAs  : 'vm'
          }
        },
        resolve: { 
          ModelsResolve : modelsList,
          IntervalsResolve: intervalsList,
          TypesResolve: typesList,
          VariablesResolve: variablesList,
          YearsResolve : yearsList,
          MonthsResolve: monthsList
        }
      }).state('pagina.download', {
        url: '/download/:id',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/dashboard/templates/download.html',
            controller    : 'DownloadRequestCtrl',
            controllerAs  : 'vm'
          }
        },
        resolve: { 
          DownloadResolve : requestDownload
        }
      });
  } 

  requestDownload.$inject = ['RequestsFactory','$stateParams'];
  function requestDownload(dataService, params) {
      return dataService.findByHashDownload(params.id).then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar arquivo para download.')
      });  
  }

  modelsList.$inject = ['ModelsFactory'];
  function modelsList(dataService) {
      return dataService.combo().then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar modelos.')
      });  
  } 

  intervalsList.$inject = ['IntervalsFactory'];
  function intervalsList(dataService) {
      return dataService.combo().then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar intervalos.')
      });
  }

  typesList.$inject = ['TypesFactory'];
  function typesList(dataService) {
      return dataService.combo().then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar tipos de saída.')
      });
  }

  variablesList.$inject = ['VariablesFactory'];
  function variablesList(dataService) {
      return dataService.combo().then(function success(data) {
        return data;
      }).catch(function error(msg) {
        setError('Erro ao carregar variáveis.')
      });
  }

  yearsList.$inject = ['DashboardFactory'];
  function yearsList(dataService) {
      return dataService.getYears().then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar anos.')
      });  
  } 

  monthsList.$inject = ['DashboardFactory'];
  function monthsList(dataService) {
      return dataService.getMonths().then(function success(data) {
        return data;        
      }).catch(function error(msg) {
        setError('Erro ao carregar anos.')
      });  
  }   

});
