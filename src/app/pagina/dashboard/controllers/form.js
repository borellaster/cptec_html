define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$state', '$stateParams', '$location', 'DashboardFactory', '$timeout',
                           'VariablesResolve', 'IntervalsResolve', 'TypesResolve', 'CitiesFactory', 
                           'PaginationFactory', 'ModelsResolve', 'MonthsResolve', 'leafletData', '$modal'];
  function DashboardCtrl($state, params, $location, dataService, $timeout,
                         variablesResolve, intervalsResolve, typesResolve, dataServiceCity, 
                         pagination, modelsResolve, monthsResolve, leafletData, modal) {
    var vm = this; 
    vm.novo = true;
    init();  

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
      if (aba == 'um') {
        vm.timeoutAbaDois  = false;
      };
      if (aba == 'dois') {
        $timeout(function() {
          vm.timeoutAbaDois  = true;
        }, 100);
        angular.forEach(vm.formum.$error, function (field) {
          angular.forEach(field, function(errorField){
              errorField.$setTouched();
              errorField.$setDirty();
          })
        });

        if (vm.formum.$invalid) {
          return true;
        }
        
        if(vm.requisicao.start_year.year > vm.requisicao.end_year.year){
          setWarning('Ano Inicial deve ser menor ou igual ao Ano Final');
          return true;
        }else{
          if(vm.requisicao.start_month.month > vm.requisicao.end_month.month){
            setWarning('Mês Inicial deve ser menor ou igual ao Ano Final');
            return true;            
          }
        }

        var lat;
        var lon;
        var message;

        if(vm.requisicao.tipoConsulta.val == "CI"){
          lat = vm.requisicao.city.latitude;
          lon = vm.requisicao.city.longitude;
          message = vm.requisicao.city.name;
        }else if(vm.requisicao.tipoConsulta.val == "CO"){
          lat = vm.requisicao.latitude;
          message = "Ponto escolhido";
        }         

        var mainMarker = {
            lat: lat,
            lng: lon,            
            message: message,
            draggable: false
        };        

        vm.center = {
            lat: lat,
            lng: lon,
            zoom: 4
        };

        vm.markers = {
            mainMarker: angular.copy(mainMarker)
        }

      }

      if (aba == 'tres') {
        vm.timeoutAbaDois  = false;
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
        str += "'"+ value.nickname +"'," 
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
      vm.requisicao.start_month = vm.requisicao.start_month.month;
      vm.requisicao.start_year = vm.requisicao.start_year.year;
      vm.requisicao.end_month = vm.requisicao.end_month.month;
      vm.requisicao.end_year = vm.requisicao.end_year.year;
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
        initRequisicao();
        vm.novo = false;
        dataService.processRequest(data.id); //LEMBRAR DE DESCOMENTAR
      })
      .catch(function error(msg) {
        setError('Erro ao salvar o requisição.');
      });
    } 

    vm.onSelectCallback = function (item){
      generateYears(item.start_year, item.end_year);
      vm.requisicao.start_year = {'year': item.start_year};
      vm.requisicao.end_year = {'year': item.end_year};;
    };    

    function generateYears(startYear, endYear) {
      vm.years = [];
      for (var i = startYear ; i <= endYear; i++) {
        vm.years.push({'year': i});
      }
    }

    function initRequisicao() {
      vm.requisicao = {
        'start_date': new Date(),
        'end_date': new Date(),
      }

      vm.requisicao.tipoConsulta = vm.tipoConsultas[0];      
      vm.requisicao.tipoRequisicao = vm.tipoRequisicoes[0];
      vm.requisicao.status = 0;
      vm.requisicao.model = vm.models.data[0];
      generateYears(vm.requisicao.model.start_year, vm.requisicao.model.end_year);
      vm.requisicao.interval = vm.intervals.data[0];
      vm.requisicao.type = vm.types.data[0]; 
      vm.requisicao.start_month = vm.months.data[0]; 
      vm.requisicao.start_year = {'year': vm.requisicao.model.start_year};
      vm.requisicao.end_month = vm.months.data[11];
      vm.requisicao.end_year = {'year': vm.requisicao.model.end_year};;
    }    

    function init() {
      vm.models = modelsResolve;
      vm.intervals = intervalsResolve;
      vm.types = typesResolve;
      vm.variablesAll = variablesResolve;      
      vm.months = monthsResolve;
      vm.timeOutMapa = false;
      vm.timeoutAbaDois = false;
      /*consultas de array no service*/
      vm.tipoConsultas = dataService.getArrayTipoConsulta();      
      vm.tipoRequisicoes = dataService.getArrayTipoRequisicoes();
      /*paginacao*/
      var ctrlName = 'DashboardCtrl';
      pagination = pagination.get(ctrlName);
      vm.pageSize = 5;
      vm.paginationPageSize = 5;
      vm.paginationItemsSize = 5;
      initRequisicao();

    }

    vm.center = {
        lat: -17.518344,
        lng: -52.207031,
        zoom: 4
    };

    /*mapa dialog*/

    vm.closeModal = function() {
      $timeout(function() {
        angular.element('#modalMap').trigger('click');
        vm.timeOutMapa = false;
      });
    }

    vm.openModalMap = function(message){
      $timeout(function() {
        angular.element('#modalMap').trigger('click');
      }, 100);

      $timeout(function() {
        vm.timeOutMapa = true
      }, 300);
    };    

  }
});
