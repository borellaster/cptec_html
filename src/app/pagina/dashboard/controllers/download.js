define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('DownloadRequestCtrl', DownloadRequestCtrl);
  DownloadRequestCtrl.$inject = ['$state', '$stateParams', '$location', 'DownloadResolve', '$timeout'];
  function DownloadRequestCtrl($state, params, $location, resolve, $timeout) {
    var vm = this; 

    vm.result = resolve;
    
    /*vm.download = function () {
      var file = document.createElement("a");
      var fileName = "Requisicao_"+vm.result.data.id+".zip";
      file.href = "data:application/zip;base64," + vm.result.data.file;
      file.download = fileName;
      file.click();      
    }*/

    vm.download = function () {
        var fileName = "Requisicao_"+vm.result.data.id+".zip";
        var zipData = vm.result.data.file;
        var blob = b64toBlob(zipData, "application/zip");

        if (window.navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            var csvUrl = URL.createObjectURL(blob);
            link.href = csvUrl;
            link.style = "visibility:hidden";
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } 

    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }        
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }       
  }
});