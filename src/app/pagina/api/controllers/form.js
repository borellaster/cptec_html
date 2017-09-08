define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ApiCtrl', ApiCtrl);
  ApiCtrl.$inject = ['$state', '$stateParams', '$location', 'ModelsResolve', 'IntervalsResolve', 'MonthsResolve', 'VariablesResolve', 'ConfigurationResolve'];

  function ApiCtrl($state, params, $location, modelsResolve, intervalsResolve, monthsResolve, variablesResolve, configurationsResolve) {
    var vm = this;  

    init();

    function init(){
      vm.api = {};
      vm.models = modelsResolve;
      vm.intervals = intervalsResolve;
      vm.api.model = vm.models.data[0];
      vm.api.interval = vm.intervals.data[0];
      vm.months = monthsResolve;
      vm.variables = variablesResolve;
      generateYears(vm.api.model.start_year, vm.api.model.end_year);
      vm.api.start_month = vm.months.data[0]; 
      vm.api.start_year = {'year': vm.api.model.start_year};
      vm.api.end_month = vm.months.data[11];
      vm.api.end_year = {'year': vm.api.model.end_year}; 
      vm.configurations = configurationsResolve;  
      //vm.link = vm.configurations.data[0].link_api;
    } 

    vm.onSelectCallback = function (item){
      generateYears(item.start_year, item.end_year);
      vm.api.start_year = {'year': item.start_year};
      vm.api.end_year = {'year': item.end_year};;
    };

    vm.generateUrl = function (form) {
      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function(errorField){
          console.log(errorField)
            errorField.$setTouched();
            errorField.$setDirty();
        })
      });

      if (form.$invalid) {
        setWarning('Informe todos os filtros.');
        return true;
      }      

      vm.link = vm.configurations.data[0].link_api;
      vm.link += "public/";
      vm.link += vm.api.model.model + "/";
      vm.link += vm.api.model.id + "/";
      vm.link += vm.api.interval.nickname + "/";
      vm.link += vm.api.interval.id + "/";
      vm.link += vm.api.start_month.month + "/";
      vm.link += vm.api.start_year.year + "/";
      vm.link += vm.api.end_month.month + "/";      
      vm.link += vm.api.end_year.year + "/";
      vm.link += vm.api.variable.nickname + "/";
      vm.link += vm.api.latitude + "/";
      vm.link += vm.api.longitude + "/";
      
    }    

    function generateYears(startYear, endYear) {
      vm.years = [];
      for (var i = startYear ; i <= endYear; i++) {
        vm.years.push({'year': i});
      }
    }    

  }
});