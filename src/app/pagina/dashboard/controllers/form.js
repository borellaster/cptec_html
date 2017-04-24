define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$state', '$stateParams', '$location', 'DashboardFactory', 
                           'VariablesFactory', 'ModelsFactory', 'CouplesFactory',
                           'ScenariosFactory', 'ResolutionsFactory', 'EnsemblesFactory',
                           'IntervalsFactory', 'TypesFactory'];
  function DashboardCtrl($state, params, $location, dataService, 
                         dataServiceVariable, dataServiceModel, dataServiceCouple,
                         dataServiceScenario, dataServiceResolution, dataServiceEnsemble,
                         dataServiceInterval, dataServiceTypes) {
    var vm = this; 
    init();   

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

    /*loading types*/
    function getTypes() {    
      dataServiceTypes.combo().then(function success(data) {
        vm.types = data;
        vm.requisicao.type = vm.types.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar tipos de saída.')
      });
    }    

    /*loading variables*/
    dataServiceVariable.combo().then(function success(data) {
      vm.variablesAll = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    });

    /*vm.loadData = function () {
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
                       vm.requisicao.start_date, 
                       vm.requisicao.end_date)
        .then(function success(result) {
        vm.result = result;          
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    }*/

    function getVariables() {
      var str = "(";
      var values = vm.requisicao.variablesAll;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += ")";      
      return str;
    };

    function getVariablesSave() {
      var str = "";
      var values = vm.requisicao.variablesAll;      
      angular.forEach(values, function(value, key) {
        str += value.nickname +"," 
      }); 
      str = str.substring(0, str.length -1);
      str += "";
      
      return str;
    };    

    vm.tipoConsultaLabel = function (str) {
      return "Escolha feita por "+dataService.tipoConsultaLabel(str);
    }

    vm.save = function() {
      vm.requisicao.variables = getVariablesSave();
      dataService.save(vm.requisicao).then(function success(data) {
        vm.updateLocation();
        setOk('Registro '+vm.acao+' com sucesso.');
      })
      .catch(function error(msg) {
        setError('Erro ao salvar o registro.');
      });
    }      

    vm.stepTwo = function () {
      vm.value = 50;
      //vm.tab1 = false;
      //vm.tab1Active = '';
      //vm.tab2 = true;
      //vm.tab2Active = 'active';
    }

    vm.stepThree = function () {
      vm.value = 75;
    }

    vm.stepFour = function () {
      vm.value = 100;
    }     

    function init() {
      vm.requisicao = {
        'start_date': new Date(),
        'end_date': new Date(),
      }

      getModels();
      getCoupleModels();
      getScenarios();
      getResolutions();
      getEnsembles();
      getIntervals();
      getTypes();
      vm.tipoConsultas = dataService.getArrayTipoConsulta();
      vm.requisicao.tipoConsulta = vm.tipoConsultas[0];
      vm.requisicao.status = 0;
      //vm.tab1 = true;
      //vm.tab1Active = 'active';
      vm.value = 25;
    }

  }
});