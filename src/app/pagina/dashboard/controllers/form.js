define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$window', '$state', '$stateParams', '$location', 'DashboardFactory', '$timeout', '$modal',
                           'VariablesResolve', 'IntervalsResolve', 'TypesResolve', 'CitiesFactory', 
                           'PaginationFactory', 'ModelsResolve', 'MonthsResolve', 'leafletData', '$scope', '$rootScope'];
  function DashboardCtrl($window, $state, params, $location, dataService, $timeout, $modal,
                         variablesResolve, intervalsResolve, typesResolve, dataServiceCity, 
                         pagination, modelsResolve, monthsResolve, leafletData, $scope, $rootScope) {
    var vm = this; 
    vm.novo = true;
    init();  

    vm.loadCities = function(municipio) {
      if(municipio.length >= 3){
        dataServiceCity.combo(municipio).then(function success(data) {
          vm.cities = data;
        }).catch(function error(msg) {
          setError('Erro ao pesquisar os municípios.');
        });  
      }
    };     

    vm.step = function(aba) {
      if (aba == 'um') {
        
        vm.timeoutAbaDois  = false;
        if(vm.novo==false){
          $state.reload();
          vm.novo = true;
        }
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
          var mainMarker = {
              lat: lat,
              lng: lon,            
              message: message,
              draggable: false
          };
          vm.center = {
              lat: lat,
              lng: lon,
              zoom: 5
          };

          vm.markers = {
              mainMarker: angular.copy(mainMarker)
          };
        }else if(vm.requisicao.tipoConsulta.val == "CO"){
          lat = Number(vm.requisicao.latitude);
          lon = Number(vm.requisicao.longitude);
          message = "Ponto escolhido";

          if(vm.requisicao.latitude < -50.1 || vm.requisicao.longitude < -100.1 || vm.requisicao.latitude > 27.9 || vm.requisicao.longitude > -29.1){          
              setWarning('Você selecionou um ponto indisponível.');              
              return;            
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
              zoom: 5
          };

          vm.markers = {
              mainMarker: angular.copy(mainMarker)
          };                    
        }else if(vm.requisicao.tipoConsulta.val == "DE"){
          lat = Number(vm.requisicao.latitude);
          lon = Number(vm.requisicao.longitude);
          message = "Ponto escolhido";

          var mainMarker = {
              lat: lat,
              lng: lon,            
              message: message,
              draggable: false
          }; 

          var geojson = {};
          if(vm.savedItems == undefined){
            geojson = {
                data: {
                  "type": "FeatureCollection",
                  "features": [
                    {
                       "type": "Feature",
                          "properties": {},
                          "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                              [
                                [Number(vm.longitudeEsquerda), Number(vm.latitudeBaixo)],
                                [Number(vm.longitudeEsquerda), Number(vm.latitudeCima)],
                                [Number(vm.longitudeDireita), Number(vm.latitudeCima)],
                                [Number(vm.longitudeDireita), Number(vm.latitudeBaixo)],
                                [Number(vm.longitudeEsquerda), Number(vm.latitudeBaixo)]
                              ]
                            ]
                          }                    
                    }
                  ]
                },
                style: {
                    fillColor: "blue"
                }
            };

            if(vm.latitudeBaixo < -50.1 || vm.longitudeEsquerda < -100.1 || vm.latitudeCima > 27.9 || vm.longitudeDireita > -29.1){
              setWarning('Você selecionou uma área indisponível.');              
              return;
            }            

            vm.center = {
              lat: Number(vm.latitudeCima),
              lng: Number(vm.longitudeEsquerda),
              zoom: 4
            };

            vm.geojson = geojson;
          }else{
            geojson = {
                data: {
                  "type": "FeatureCollection",
                  "features": [
                    {
                       "type": "Feature",
                          "properties": {},
                          "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                              vm.savedItems[0].geoJSON.geometry.coordinates[0]
                            ]
                          }                    
                    }
                  ]
                },
                style: {
                    fillColor: "blue"
                }
            };

            if(vm.latitudeBaixo < -50.1 || vm.longitudeEsquerda < -100.1 || vm.latitudeCima > 27.9 || vm.longitudeDireita > -29.1){
              setWarning('Você selecionou uma área indisponível.'); 
              return;
            }

            vm.center = {
              lat: vm.latitudeCima,
              lng: vm.longitudeEsquerda,
              zoom: 4
            };
            vm.geojson = geojson;
          }
        }

        console.log('opaaaa')
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

    /*function getVariables() {
      var str = "(";
      var values = vm.requisicao.variablesAll;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += ")";      
      return str;
    };*/

    function getVariables() {
      var str = "(";           
      str += "'"+ vm.requisicao.variablesAll.nickname +"'";      
      str += ")";      
      return str;
    };    

    /*function getVariablesSave() {
      var str = "";
      var values = vm.requisicao.variablesAll;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += "";
      
      return str;
    };*/    

    function getVariablesSave() {
      if(vm.requisicao.variablesAll != undefined){
        var str = "";
        str += "'"+ vm.requisicao.variablesAll.nickname +"'" 
        str += "";      
        return str;
      }else{
        return "";
      }
    };    

    vm.tipoConsultaLabel = function (str) {
      return dataService.tipoConsultaLabel(str);
    }

    vm.getVariablesFinalizar = function () {
      return getVariablesSave();
    }  

    vm.focusCoordinates = function() {
      vm.savedItems = undefined;      
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
      }else if(vm.requisicao.tipoConsulta.val == "DE"){
        if(vm.savedItems == undefined){
          point = { type: 'Polygon', coordinates: [
            [
              [Number(vm.longitudeEsquerda), Number(vm.latitudeBaixo)],
              [Number(vm.longitudeEsquerda), Number(vm.latitudeCima)],
              [Number(vm.longitudeDireita), Number(vm.latitudeCima)],
              [Number(vm.longitudeDireita), Number(vm.latitudeBaixo)],
              [Number(vm.longitudeEsquerda), Number(vm.latitudeBaixo)]
            ]
          ]};
        }else{
          point = { type: 'Polygon', coordinates: [vm.savedItems[0].geoJSON.geometry.coordinates[0]]};
        }
      }

      vm.requisicao.location = point;     
      dataService.save(vm.requisicao).then(function success(data) {        
        vm.novo = false;
        if(vm.requisicao.query_type=='DE'){
          if(vm.requisicao.type.extension=='.tif'){
            initRequisicao();
            dataService.processRequestTiff(data.id);
          }else{
            initRequisicao();
            dataService.processRequest(data.id);
          }
        }else{
          initRequisicao();
          dataService.processRequest(data.id);
        }        
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

    vm.typesFunction = function (){
      typesFunction();
    }

    function typesFunction (){
      var array = {data:[]};
      if(vm.requisicao.tipoConsulta.val != 'DE'){
        for (var i = 0; i < vm.types.data.length; i++) {
          var item = vm.types.data[i];
          if(item.extension != '.tif'){
            array.data.push(item);
          }
        }
        vm.types = array;        
      }else{
        vm.types = typesResolve;

      }
      vm.requisicao.type = vm.types.data[0];
    }    

    function initRequisicao() {
      vm.requisicao = {
        'start_date': new Date(),
        'end_date': new Date(),
      }

      vm.requisicao.tipoConsulta = vm.tipoConsultas[0];

      vm.requisicao.tipoRequisicao = vm.tipoRequisicoes[0];
      typesFunction();
      vm.requisicao.status = 0;
      vm.requisicao.model = vm.models.data[0];
      generateYears(vm.requisicao.model.start_year, vm.requisicao.model.end_year);
      vm.requisicao.interval = vm.intervals.data[0];
      vm.requisicao.type = vm.types.data[0]; 
      vm.requisicao.start_month = vm.months.data[0]; 
      vm.requisicao.start_year = {'year': vm.requisicao.model.start_year};
      vm.requisicao.end_month = vm.months.data[11];
      vm.requisicao.end_year = {'year': vm.requisicao.model.end_year};
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

    $rootScope.$on("latitudeCima", function(event, value) {
      event.preventDefault();
      event.stopPropagation();
      vm.latitudeCima = value;
    });

    $rootScope.$on("latitudeBaixo", function(event, value) {
      event.preventDefault();
      event.stopPropagation();
      vm.latitudeBaixo = value;
    });

    $rootScope.$on("longitudeEsquerda", function(event, value) {
      event.preventDefault();
      event.stopPropagation();
      vm.longitudeEsquerda = value;
    });

    $rootScope.$on("longitudeDireita", function(event, value) {
      event.preventDefault();
      event.stopPropagation();
      vm.longitudeDireita = value;
    });

    $rootScope.$on("savedItems", function(event, value) {
      event.preventDefault();
      event.stopPropagation();
      vm.savedItems = value;
    });    

    vm.openModalMap = function(){
      var modalInstance = $modal.open({
          templateUrl: 'app/pagina/dashboard/templates/modal.html',
          controller: 'ModalController',
          controllerAs: 'vm'
      });
      vm.latitudeCima = undefined;
      vm.latitudeBaixo = undefined;
      vm.longitudeEsquerda = undefined;
      vm.longitudeDireita = undefined;
    };

  }
});
