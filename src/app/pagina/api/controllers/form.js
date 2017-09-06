define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ApiCtrl', ApiCtrl);
  ApiCtrl.$inject = ['$state', '$stateParams', '$location', 'ModelsResolve', 'IntervalsResolve', 'MonthsResolve'];

  function ApiCtrl($state, params, $location, modelsResolve, intervalsResolve, monthsResolve) {
    var vm = this;  

    init();

    function init(){
      vm.api = {};
      vm.models = modelsResolve;
      vm.intervals = intervalsResolve;
      vm.api.model = vm.models.data[0];
      vm.api.interval = vm.intervals.data[0];
      vm.months = monthsResolve;
      generateYears(vm.api.model.start_year, vm.api.model.end_year);
      vm.api.start_month = vm.months.data[0]; 
      vm.api.start_year = {'year': vm.api.model.start_year};
      vm.api.end_month = vm.months.data[11];
      vm.api.end_year = {'year': vm.api.model.end_year};      
    } 

    vm.onSelectCallback = function (item){
      generateYears(item.start_year, item.end_year);
      vm.api.start_year = {'year': item.start_year};
      vm.api.end_year = {'year': item.end_year};;
    };    

    function generateYears(startYear, endYear) {
      vm.years = [];
      for (var i = startYear ; i <= endYear; i++) {
        vm.years.push({'year': i});
      }
    }    

  }
});