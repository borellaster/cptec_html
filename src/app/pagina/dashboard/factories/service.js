define(function(require) {
  'use strict';

  var module = require('../module');
  module.factory('DashboardFactory', DashboardFactory);
  DashboardFactory.$inject = [
    'DashboardResource', 'DashboardPagResource', 'RequestsResource'
  ];

  function DashboardFactory(resource, resourcePag, resourceRequisicao) {
    var service = {
      list: list,
      listpag: listpag,
      getArrayTipoConsulta: getArrayTipoConsulta,
      tipoConsultaLabel: tipoConsultaLabel,
      save: save
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

    function listpag(longitude, latitude, variables, startdate, enddate, page, size){
      return resourcePag.get({
          'longitude': longitude, 
          'latitude': latitude, 
          'variables': variables,
          'startdate': startdate,
          'enddate': enddate,          
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
        { val: 'CO', desc: 'Coordenadas' },
        { val: 'CI', desc: 'Cidade' },
        { val: 'DE', desc: 'Desenho' }
      ];
      return array;
    }         

   };
  
});