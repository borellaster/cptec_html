define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['$state', '$stateParams', '$location', 'MapFactory', 'VariablesFactory'];
  function MapCtrl($state, params, $location, dataService, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    vm.center = {
        lat: -17.518344,
        lng: -52.207031,
        zoom: 4
    };

    vm.tiles = {
        name: 'Mapbox Park',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ',
            mapid: 'feelcreative.llm8dpdk'
        }
    };

    vm.legend = {
        position: 'bottomleft',
        colors: ['#FFFF00', '#FF0000', '#FF0000', '#FF0000'],
        labels: ['Soja voluntária', '1-9 ocorrências', '10-99 ocorrências', '> 99 ocorrências']
    };   


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
      dataService.list(vm.requisicao.longitude,vm.requisicao.latitude, getVariables()).then(function success(result) {
        vm.result = result;          
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    } 

    //-28.263/-52.407/('OCIS')

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


               

  }
});