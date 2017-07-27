define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ModelfreqsCtrl', ModelfreqsCtrl);

  ModelfreqsCtrl.$inject = ['$state', '$stateParams', '$location', 'ModelfreqsFactory', 'ModelfreqsResource', 
                            'ModelsFactory', 'IntervalsFactory'];
  function ModelfreqsCtrl($state, params, $location, dataService, resource, 
                          dataServiceModel, dataServiceInterval) {
    var vm = this;
    vm.showConfirm = false;

    vm.updateLocation = function() {
      $state.go('home.modelfreqs.list');
    }

    dataServiceModel.combo().then(function success(data) {
      vm.models = data;
    }).catch(function error(msg) {
      setError('Erro ao pesquisar os modelos.');
    });

    dataServiceInterval.combo().then(function success(data) {
      vm.intervals = data;
    }).catch(function error(msg) {
      setError('Erro ao pesquisar os frequências.');
    });        


    if(params.id == undefined){
        vm.title = 'Cadastrar combinação Modelo/Frequência';
        vm.acao = 'incluído';
        vm.modelfreqs = new resource({
          'id': undefined
        });        
    } else {
        vm.title = 'Editar combinação Modelo/Frequência';
        vm.acao = 'alterado';
        dataService.findById(params.id).then(function success(data) {
          vm.modelfreqs = data;
        }).catch(function error(msg) {
          setError('Erro ao carregar registro.')
        });         
    }

    vm.save = function(form) {
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

      vm.modelfreqs.model_id = vm.modelfreqs.model.id;
      vm.modelfreqs.interval_id = vm.modelfreqs.interval.id;
      dataService.save(vm.modelfreqs).then(function success(data) {
        vm.updateLocation();
        setOk('Registro '+vm.acao+' com sucesso.');
      })
      .catch(function error(msg) {
        setError('Erro ao salvar o registro.');
      });
    }

    vm.cancel = function() {
        vm.updateLocation();
        vm.showConfirm = false;
    }  

    vm.cancelRemove = function() {
        vm.showConfirm = false;
    }        
    
    vm.remove = function() {
      vm.showConfirm = true;
    }

    vm.delete = function(id) {
      dataService.remove(id).then(function(result) {
        vm.updateLocation();
        setOk('Registro excluído com sucesso.');
      }).catch(function error(msg) {
        setError('Erro ao excluir o registro.');
      });
    } 
  }
});