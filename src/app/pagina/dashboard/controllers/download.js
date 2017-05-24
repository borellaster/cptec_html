define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DownloadRequestCtrl', DownloadRequestCtrl);
  DownloadRequestCtrl.$inject = ['$state', '$stateParams', '$location', 'DownloadResolve', '$timeout'];
  function DownloadRequestCtrl($state, params, $location, resolve, $timeout) {
    var vm = this; 

    vm.result = resolve;
    
    vm.download = function () {
      var file = document.createElement("a");
      var fileName = "Requisicao_"+vm.result.data.id+".zip";
      file.href = "data:application/zip;base64," + vm.result.data.file;
      file.download = fileName;
      file.click();      
    }
  }
});