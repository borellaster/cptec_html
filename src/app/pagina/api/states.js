define(function(require) {
  'use strict';

  var module = require('./module');
  module.config(configureStates);
  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('pagina.api', {
        url: '/api',
        views: {
          'content@pagina': {
            templateUrl   : 'app/pagina/api/templates/form.html',
            controller    : 'ApiCtrl',
            controllerAs  : 'vm'
          }
        },
        resolve: { 
          ModelsResolve : modelsList,
          IntervalsResolve: intervalsList,
          MonthsResolve: monthsList,
          VariablesResolve: variablesList,
          ConfigurationResolve: configurationsList
        }
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

  monthsList.$inject = ['DashboardFactory'];
  function monthsList(dataService) {
      return dataService.getMonths();
  }   

  variablesList.$inject = ['VariablesFactory'];
  function variablesList(dataService) {
    return dataService.combo().then(function success(data) {
      return data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });
  }

  configurationsList.$inject = ['ConfigurationsFactory'];
  function configurationsList(dataService) {
    return dataService.list(1, 1).then(function success(data) {
      return data;
    }).catch(function error(msg) {
      setError('Erro ao carregar configurações.')
    });
  }  

});
