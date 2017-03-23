define(function(require) {
  'use strict';

  var module = require('../module');

  module.directive('focus', focus);

  //---
  function focus() {
    return {
      link: function(scope, element, attr) {
        element[0].focus();
      }
    }
  }

  module.filter('propsFilter', propsFilter);
  function propsFilter() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        out = items;
      }

      return out;
    }
  }

module.directive('cptecDate', cptecDate);
  function cptecDate() {
    var tpl = '<div style="position:relative">' +
              '<div class="mui-textfield">' +
                '<input class="" aria-label="{{label}}" type="text" ui-mask="99/99/9999" show-weeks="false" ng-blur="ngBlur()" ng-change="ngChange()" model-view-value="true" ng-disabled="isDisabled" is-open="opened" show-button-bar="false"  datepicker-popup="dd/MM/yyyy" ng-required="isRequired" ui-mask-placeholder-char="space" class=" cmp-date" id="{{name}}Input" name="{{name}}" ng-model="modelo">' +
                '<span ng-if="isRequired" class="requerido">Este campo é obrigatório.</span>' +
                '<label>{{label}} <i ng-if="isRequired" class="fa fa-asterisk" style="color:red; font-size:8px;"></i></label>' +
                '<a class="btn btn-success btn-date" style="position: absolute;top: 15px;right: 0;" ng-disabled="isDisabled" ng-click="open($event); setData();"><i class="fa fa-calendar"></i></a>' +
                '</div>' +
              '</div>'

    var link = function (scope, iElement, iAttrs, ctrl) {
      if (scope.inputSize == undefined) scope.inputSize = 3;
      scope.isMinDate = false;
      scope.isMaxDate = false;

      ctrl.$formatters.push(function (value) {
        if (value != undefined && value != '' && value != null)
          scope.modelo = moment(value).format('DD/MM/YYYY');
        else
          scope.modelo = undefined;
      });

      scope.open = function ($event) {
        scope.opened = true;
      }

      scope.$watch('minDate', function (newValue, oldValue) {
        if (!!scope.minDate) {
          var valor = Date.parse(scope.modelo.slice(6, 10) + '-' + scope.modelo.slice(3, 5) + '-' + scope.modelo.slice(0, 2)) / 1000;
          var mindate = Date.parse(newValue) / 1000;

          if (valor < mindate) {
            scope.isMinDate = true;
          } else {
            scope.isMinDate = false;
          }
        }
      });

      scope.$watch('maxDate', function (newValue, oldValue) {
        if (!!scope.maxDate) {
          var valor = Date.parse(scope.modelo.slice(6, 10) + '-' + scope.modelo.slice(3, 5) + '-' + scope.modelo.slice(0, 2)) / 1000;
          var maxdate = Date.parse(newValue) / 1000;

          if (valor > maxdate) {
            scope.isMaxDate = true;
          } else {
            scope.isMaxDate = false;
          }
        }
      });

      scope.$watch('modelo', function (newValue, oldValue) {
        if (newValue != undefined && newValue.length == undefined) newValue = moment(newValue).format('DD/MM/YYYY');
        if (scope.modelo != undefined && scope.modelo != '' && !iAttrs.hasOwnProperty('noValidate')) {
          var regex = new RegExp(/^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/);
          var data = newValue.slice(0, 2) + '/' + newValue.slice(3, 5) + '/' + newValue.slice(6, 10);
          if (regex.test(data)) {
            ctrl.$setViewValue(newValue.slice(6, 10) + '-' + newValue.slice(3, 5) + '-' + newValue.slice(0, 2));
          } else {
            ctrl.$setViewValue(undefined);
          }
        } else {
          ctrl.$setViewValue(undefined);
        }
        if (!!newValue) {
          var valor = Date.parse(newValue.slice(6, 10) + '-' + newValue.slice(3, 5) + '-' + newValue.slice(0, 2)) / 1000;
          if (!!scope.minDate) {
            var mindate = Date.parse(scope.minDate) / 1000;

            if (valor < mindate) {
              scope.isMinDate = true;
            } else {
              scope.isMinDate = false;
            }
          }

          if (!!scope.maxDate) {
            var maxdate = Date.parse(scope.maxDate) / 1000;

            if (valor > maxdate) {
              scope.isMaxDate = true;
            } else {
              scope.isMaxDate = false;
            }
          }
        }
      }, true);

      scope.setData = function () {
        if (scope.modelo == undefined) {
          var data = new Date();
          scope.modelo = pad(data.getUTCDate()) + '/' + pad(data.getUTCMonth() + 1) + '/' + pad(data.getUTCFullYear());
        }
      }

      function pad(n) {
        return (n < 10) ? ("0" + n) : n;
      }
    }

    return {
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      scope: {
        label: '@',
        inputSize: '@?',
        name: '@',
        isRequired: '=?',
        isDisabled: '=?',
        ngBlur: '&?',
        ngChange: '&?',
        info: '@?',
        minDate: '=?',
        maxDate: '=?'
      },
      link: link,
      template: tpl
    };
  }   
  
});
