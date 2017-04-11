define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$state', '$stateParams', '$location', 'DashboardFactory', 
                           'VariablesFactory', 'ModelsFactory', 'CouplesFactory',
                           'ScenariosFactory', 'ResolutionsFactory', 'EnsemblesFactory',
                           'IntervalsFactory'];
  function DashboardCtrl($state, params, $location, dataService, 
                         dataServiceVariable, dataServiceModel, dataServiceCouple,
                         dataServiceScenario, dataServiceResolution, dataServiceEnsemble,
                         dataServiceInterval) {
    var vm = this; 
    init();   

    vm.requisicao = {
      'inicio': new Date(),
      'fim': new Date(),
    }

    /*loading modules*/
    function getModels() {    
      dataServiceModel.combo().then(function success(data) {
        vm.models = data;
        vm.requisicao.model = vm.models.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar modelos.')
      });
    }

    /*loading couple models*/
    function getCoupleModels() {    
      dataServiceCouple.combo().then(function success(data) {
        vm.couples = data;
        vm.requisicao.couple = vm.couples.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar modelos acoplados.')
      });
    }

    /*loading scenarios*/
    function getScenarios() {    
      dataServiceScenario.combo().then(function success(data) {
        vm.scenarios = data;
        vm.requisicao.scenario = vm.scenarios.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar cenários.')
      });
    }    

    /*loading resolutions*/
    function getResolutions() {    
      dataServiceResolution.combo().then(function success(data) {
        vm.resolutions = data;
        vm.requisicao.resolution = vm.resolutions.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar resoluções.')
      });
    }

    /*loading ensembles*/
    function getEnsembles() {    
      dataServiceEnsemble.combo().then(function success(data) {
        vm.ensembles = data;
        vm.requisicao.ensemble = vm.ensembles.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar conjuntos.')
      });
    }  

    /*loading intervals*/
    function getIntervals() {    
      dataServiceInterval.combo().then(function success(data) {
        vm.intervals = data;
        vm.requisicao.interval = vm.intervals.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar intervalos.')
      });
    }

    /*loading variables*/
    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });

    vm.loadData = function () {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
          console.log(errorField)
            errorField.$setTouched();
            errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        return true;
      }      
      dataService.list(vm.requisicao.longitude,
                       vm.requisicao.latitude, 
                       getVariables(), 
                       vm.requisicao.inicio, 
                       vm.requisicao.fim)
        .then(function success(result) {
        vm.result = result;          
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    } 

    function getVariables() {
      var str = "(";
      var values = vm.requisicao.variables;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += ")";      
      console.log(str);
      
      return str;
    };

    function init() {
      getModels();
      getCoupleModels();
      getScenarios();
      getResolutions();
      getEnsembles();
      getIntervals();
    }

  }
});