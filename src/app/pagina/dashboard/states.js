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
          VariablesResolve: variablesList
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

});
