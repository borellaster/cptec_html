define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('TutorialCtrl', TutorialCtrl);
  TutorialCtrl.$inject = ['$state', '$stateParams', '$location', '$window'];

  function TutorialCtrl($state, params, $location, $window) {
    var vm = this;   
  	vm.link = function (url){	  
  	  $window.open(url);
  	}  

    vm.download = function () {
      var fileName = "converte_csv.R";
      var link = document.createElement("a");
      link.href = "http://ftp1.cptec.inpe.br/etamdl/Projetos/Projeta/converte_csv.R";
      link.style = "visibility:hidden";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }          
  }
});