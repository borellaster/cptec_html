define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('VisualizationCtrl', VisualizationCtrl);
  VisualizationCtrl.$inject = ['$state', '$stateParams', '$location', 'ConfigurationsFactory', '$sce'];
  function VisualizationCtrl($state, params, $location, dataService, $sce) {
    var vm = this; 
    init();   

    function init() {
      dataService.list(1, 1).then(function success(result) {
        vm.result = result;
        vm.currentPage = result.page;
        vm.link = vm.result.data[0].link_visualization;
        console.log(vm.link);
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      }); 
    }

    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

  }
});