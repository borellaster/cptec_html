define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('UniqueCtrl', UniqueCtrl);

  UniqueCtrl.$inject = ['$state', '$stateParams', '$location', 'VariablesFactory'];
  function UniqueCtrl($state, params, $location, dataServiceVariable) {
    var vm = this;    
    vm.showConfirm = false;  

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
      console.log(vm.variables);
      activate();
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    }); 

    function activate() {
        vm.leftValue = [];
        var leftcounter = 0;
        vm.rightValue = [];
        var rightcounter = 0;

        function loadMoreLeft() {
            for (var i = 0; i < vm.variables.data.length; i++) {
                vm.leftValue.push({
                    'name': vm.variables.data[i].nickname + ' - ' + vm.variables.data[i].description
                });
            }
        }

        function loadMoreRight() {

        }


        vm.options = {
            leftContainerScrollEnd: function () {
                loadMoreLeft()


            },
            rightContainerScrollEnd: function () {
                loadMoreRight();

            },
            leftContainerSearch: function (text) {
                console.log(text)
                vm.leftValue = $filter('filter')(leftValue, {
                    'name': text
                })

            },
            rightContainerSearch: function (text) {

                vm.rightValue = $filter('filter')(rightValue, {
                    'name': text
                })
            },
            leftContainerLabel: 'Disponíveis',
            rightContainerLabel: 'Selecionados',
            onMoveRight: function () {

            },
            onMoveLeft: function () {

            }

        };
        loadMoreLeft();
        loadMoreRight();


        var leftValue = angular.copy(vm.leftValue)
 
        var rightValue = angular.copy(vm.rightValue)

    }          

  }
});