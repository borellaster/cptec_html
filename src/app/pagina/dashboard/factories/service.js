define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('DashboardFactory', DashboardFactory);
  DashboardFactory.$inject = ['DashboardResource', 'DashboardPagResource', 'RequestsResource', 'ProcessRequestResource', 
        'YearRequestResource', 'MonthRequestResource'];
  function DashboardFactory(resource, resourcePag, resourceRequisicao, resourceProcess, 
        resourceYear, resourceMonth) {
    var service = {
      list: list,
      listpag: listpag,
      getArrayTipoConsulta: getArrayTipoConsulta,
      tipoConsultaLabel: tipoConsultaLabel,
      save: save,
      getArrayTipoRequisicoes: getArrayTipoRequisicoes,
      processRequest: processRequest,
      getYears: getYears,
      getMonths: getMonths
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

    function listpag(longitude, latitude, variables, startmonth, startyear, endmonth, endyear, model, page, size){
      return resourcePag.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startmonth': startmonth,
          'startyear': startyear, 
          'endmonth': endmonth,
          'endyear': endyear,           
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
        {val: 'CO', desc: 'Por ponto'},
        {val: 'CI', desc: 'Por cidade'},
        {val: 'DE', desc: 'Desenho no mapa'},
        {val: 'SF', desc: 'Importar Shapefile'}
      ];
      return array;
    }

    function getMonths() {
      var array = [
        {month: 1, nome: 'Janeiro'},
        {month: 2, nome: 'Fevereiro'},
        {month: 3, nome: 'Março'},
        {month: 4, nome: 'Abril'},
        {month: 5, nome: 'Maio'},
        {month: 6, nome: 'Junho'},
        {month: 7, nome: 'Julho'},
        {month: 8, nome: 'Agosto'},
        {month: 9, nome: 'Setembro'},
        {month: 10, nome: 'Outubro'},
        {month: 11, nome: 'Novembro'},
        {month: 12, nome: 'Dezembro'}
      ];
      var result = {data:[]};
      result.data = array;
      return result;
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

    function getYears() {
      return resourceYear.get().$promise;
    }  

    /*function getMonths() {
      return resourceMonth.get().$promise;
    }*/                   

   };
  
});