define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$state', '$stateParams', '$location', 'DashboardFactory', '$timeout',
                           'VariablesFactory', 'ModelsFactory', 'CouplesFactory',
                           'ScenariosFactory', 'ResolutionsFactory', 'EnsemblesFactory',
                           'IntervalsFactory', 'TypesFactory', 'CitiesFactory', 'PaginationFactory'];
  function DashboardCtrl($state, params, $location, dataService, $timeout,
                         dataServiceVariable, dataServiceModel, dataServiceCouple,
                         dataServiceScenario, dataServiceResolution, dataServiceEnsemble,
                         dataServiceInterval, dataServiceTypes, dataServiceCity, pagination) {
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
    /*function getCoupleModels() {    
      dataServiceCouple.combo().then(function success(data) {
        vm.couples = data;
        vm.requisicao.couple = vm.couples.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar modelos acoplados.')
      });
    }*/

    /*loading scenarios*/
    /*function getScenarios() {    
      dataServiceScenario.combo().then(function success(data) {
        vm.scenarios = data;
        vm.requisicao.scenario = vm.scenarios.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar cenários.')
      });
    }*/   

    /*loading resolutions*/
    /*function getResolutions() {    
      dataServiceResolution.combo().then(function success(data) {
        vm.resolutions = data;
        vm.requisicao.resolution = vm.resolutions.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar resoluções.')
      });
    }*/

    /*loading ensembles*/
    /*function getEnsembles() {    
      dataServiceEnsemble.combo().then(function success(data) {
        vm.ensembles = data;
        vm.requisicao.ensemble = vm.ensembles.data[0];
      }).catch(function error(msg) {
        setError('Erro ao carregar conjuntos.')
      });
    }*/ 

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

    vm.pageChanged = function() {
      pagination.setNextPage(vm.result.page);
      vm.loadData(pagination.getNextPage());
    }    

    vm.loadData = function (page) {
      var latitude = 0;
      var longitude = 0;
      if(vm.requisicao.tipoConsulta.val == "CI"){
        latitude = vm.requisicao.city.latitude;
        longitude = vm.requisicao.city.longitude;
      }else if(vm.requisicao.tipoConsulta.val == "CO"){
        latitude = vm.requisicao.latitude;
        longitude = vm.requisicao.longitude;
      }
      dataService.listpag(longitude, latitude, getVariables(), vm.requisicao.start_date, 
                          vm.requisicao.end_date, page, pagination.getPageSize())
        .then(function success(result) {
        vm.result = result;    
        vm.currentPage = result.page;
        pagination.updateMetainf(
          result.count,
          result.length,
          result.page,
          result.pages
        );              
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    }

    vm.loadCities = function(cidade) {
      if(cidade.length >= 3){
        dataServiceCity.combo(cidade).then(function success(data) {
          vm.cities = data;
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os cidades.');
        });  
      }
    };     

    vm.step = function(aba) {
      if (aba == 'dois') {
        angular.forEach(vm.formum.$error, function (field) {
          angular.forEach(field, function(errorField){
              errorField.$setTouched();
              errorField.$setDirty();
          })
        });

        if (vm.formum.$invalid) {
          return true;
        }
        vm.loadData(1);
      }

      if (aba == 'tres') {
        angular.forEach(vm.formdois.$error, function (field) {
          angular.forEach(field, function(errorField){
              errorField.$setTouched();
              errorField.$setDirty();
          })
        });

        if (vm.formdois.$invalid) {
          return true;
        }
      }

      if (aba == 'quatro') {
        angular.forEach(vm.formtres.$error, function (field) {
          angular.forEach(field, function(errorField){
              errorField.$setTouched();
              errorField.$setDirty();
          })
        });

        if (vm.formtres.$invalid) {
          return true;
        }
      }


      $timeout(function() {
        $("#click-aba-" + aba).click();
        $(".aba-" + aba).addClass('active');
      });
    }

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
      return dataService.tipoConsultaLabel(str);
    }

    vm.getVariablesFinalizar = function () {
      return getVariablesSave();
    }    

    vm.save = function() {
      vm.requisicao.variables = getVariablesSave();
      vm.requisicao.type_id = vm.requisicao.type.id;
      vm.requisicao.model_id = vm.requisicao.model.id;
      vm.requisicao.interval_id = vm.requisicao.interval.id;
      vm.requisicao.query_type = vm.requisicao.tipoConsulta.val;
      var points = [];
      var latitude = 0;
      var longitude = 0;  
      var point = {};    
      if(vm.requisicao.tipoConsulta.val == "CI"){
        latitude = vm.requisicao.city.latitude;
        longitude = vm.requisicao.city.longitude;
        point = { type: 'Point', coordinates: [latitude,longitude]};
      }else if(vm.requisicao.tipoConsulta.val == "CO"){
        latitude = vm.requisicao.latitude;
        longitude = vm.requisicao.longitude;
        point = { type: 'Point', coordinates: [latitude,longitude]};
      } 
      vm.requisicao.location = point;     
      dataService.save(vm.requisicao).then(function success(data) {
        setOk('Requisição incluída com sucesso.');
      })
      .catch(function error(msg) {
        setError('Erro ao salvar o requisição.');
      });
    }      

    function init() {
      vm.requisicao = {
        'start_date': new Date(),
        'end_date': new Date(),
      }

      getModels();
      //getCoupleModels();
      //getScenarios();
      //getResolutions();
      //getEnsembles();
      getIntervals();
      getTypes();
      /*tipo de consulta*/
      vm.tipoConsultas = dataService.getArrayTipoConsulta();
      vm.requisicao.tipoConsulta = vm.tipoConsultas[0];
      /*tipo de requisicao*/
      vm.tipoRequisicoes = dataService.getArrayTipoRequisicoes();
      vm.requisicao.tipoRequisicao = vm.tipoRequisicoes[0];
      vm.requisicao.status = 0;

      var ctrlName = 'DashboardCtrl';
      pagination = pagination.get(ctrlName);
      vm.pageSize = pagination.getPageSize();
      vm.paginationPageSize = pagination.getPageSize();
      vm.paginationItemsSize = 5;

    }

  }
});