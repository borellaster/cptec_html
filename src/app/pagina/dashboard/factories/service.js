define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('DashboardFactory', DashboardFactory);
  DashboardFactory.$inject = [
    'DashboardResource', 'DashboardPagResource', 'RequestsResource', 'ProcessRequestResource'
  ];

  function DashboardFactory(resource, resourcePag, resourceRequisicao, resourceProcess) {
    var service = {
      list: list,
      listpag: listpag,
      getArrayTipoConsulta: getArrayTipoConsulta,
      tipoConsultaLabel: tipoConsultaLabel,
      save: save,
      getArrayTipoRequisicoes: getArrayTipoRequisicoes,
      processRequest: processRequest
    };

    return service;

    function save(requests) {
      if(requests.id == undefined){
          return resourceRequisicao.save(requests).$promise;
        }else{
          return resourceRequisicao.update({'id': requests.id}, requests).$promise;
        }
    }     

    function list(longitude, latitude, variables, startdate, enddate){
      return resource.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startdate': startdate,
          'enddate': enddate
      }).$promise;
    }   

    function listpag(longitude, latitude, variables, startdate, enddate, model, page, size){
      return resourcePag.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startdate': startdate,
          'enddate': enddate, 
          'id': model,         
          'page': page,
          'size': size
      }).$promise;
    } 

    function tipoConsultaLabel(str) {
      var res = undefined;
      angular.forEach(getArrayTipoConsulta(), function (tipo) {
        if (tipo.val == str)
          res = tipo.desc;
      });
      return res;
    }    

    function getArrayTipoConsulta() {
      var array = [
        {val: 'CO', desc: 'Por coordenadas'},
        {val: 'CI', desc: 'Por cidade'},
        {val: 'DE', desc: 'Desenho no mapa'},
        {val: 'SF', desc: 'Importar Shapefile'}
      ];
      return array;
    }   

    function getArrayTipoRequisicoes() {
      var array = [
        {val: 'T', desc: 'Visualização em tabela'},
        {val: 'M', desc: 'Visualização no mapa'},        
        {val: 'G', desc: 'Visualização em gráfico'}
      ];
      return array;
    }

    function processRequest(id) {
      return resourceProcess.get({'id': id});
    }                

   };
  
});