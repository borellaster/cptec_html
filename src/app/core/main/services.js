define(function (require) {
  'use strict';

  var module = require('./module');

  module.factory('ServiceFuncoes', ServiceFuncoes);
  ServiceFuncoes.$inject = ['$resource', '$window', '$state', '$timeout'];

  function ServiceFuncoes($resource, $window, $state, $timeout) {
    var service = {
      report: report,
      download: download,
      upload: upload,
      removePropertyEmpty: removePropertyEmpty,
      isEmpty: isEmpty,
      urlParam: urlParam,
      padLeft: padLeft,
      objectToArray: objectToArray,
      prepareFilter: prepareFilter,
      setaCamposInvalidos: setaCamposInvalidos,
      monthName: monthName,
      findQuadrant: findQuadrant
    };

    return service;

    function monthName(start, end) {
      var mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      if (start != undefined && end != undefined) {
        return mes.slice(start, end);
      } else {
        return mes;
      }

    };

    function findQuadrant(lat, lng) {
      var latMin = -35.05;
      var latMax = 5.90;

      var lngMin = -75.05;
      var lngMax = -33.95;

      var scala = 0.15;

      var coord = {lat: Number, lng:Number};
      
      if(lat > latMax){
          coord.lat = latMax;
      }else if(lat < latMin){
          coord.lat = latMin;
      }else{
          coord.lat = latMin + ((Math.floor((Math.abs(latMin) + lat) / scala) ) * scala ) + scala / 2;
      }

      if(lng > lngMax){
          coord.lng = lngMax;
      }else if(lng < lngMin){
          coord.lng = lngMin;
      }else{
          coord.lng = lngMin + ((Math.floor((Math.abs(lngMin) + lng) / scala)) * scala ) + scala / 2;
      }

      return coord;
    };    

    function actionsResource(method) {
      return {
        method: method,
        responseType: 'arraybuffer',
        transformResponse: function (data, headers) {

          var contentType = headers('Content-Type');

          var bytes;
          if (data) {
            bytes = new Blob([data], {
              type: contentType
            });
          }
          $window.open(URL.createObjectURL(bytes));
        }
      };
    };

    function report(url, params, method) {
      if (!method) method = 'GET';
      return $resource(
        url, params,
        {
          report: actionsResource(method)
        }
      );
    };

    function download(url, params, method) {
      if (!method) method = 'GET';
      return $resource(
        url, params,
        {
          download: actionsResource(method)
        }
      );
    };

    function upload(url, params){
      return {
        uploader: uploader,
        api: api,
        view: view
      }

      function api(){
        return $resource(url, params);
      }

      function view(id){
        return download(url, params);
      }

      function uploader(){
        return new FileUploader({
          url: urlParam(url, params),
          alias: 'file'
        });
      }
    }

    function prepareFilter(filter) {

      var objectNested = function objectNested(value, key) {
        var result = {};
        var valor = {};
        if (typeof value == "object") {
          if (value.hasOwnProperty("0")) {
            valor[key] = JSON.stringify(objectToArray(value));
            return valor;
          } else {
            for (var property in value) {
              result = Object.assign(result,
                objectNested(value[property], (!!key) ? (key+"."+property) : property));
            }
          }
        } else if (Array.isArray(value)) {
          valor[key] = JSON.stringify(value);
          return valor;
        } else {
          valor[key] = value;
          return valor;
        }
        return result;
      }

      var obj = removePropertyEmpty(Object.assign({}, filter));
      return objectNested(obj);
    }

    function objectToArray(obj) {
      return Object.keys(obj).map(function(key) { return obj[key] });
    }

    function removePropertyEmpty(obj) {
      for (var property in obj) {
        if (isEmpty(obj[property])) {
          delete obj[property];
        } else if (Array.isArray(obj[property])) {
          obj[property] = obj[property].filter(function (val) { return !isEmpty(val) });
        } else if (typeof obj[property] == "object") {
          removePropertyEmpty(obj[property]);
        }
      }
      return obj;
    };

    function isEmpty(obj) {
      if (!obj) return true;
      if (typeof obj == "object") {
        if (Object.getOwnPropertyNames(obj).length <= 0) {
          return true;
        }
      }
      return false;
    }

    function urlParam(url, paramDefaults){
      var param = Object.assign({}, paramDefaults);
      var pathParts = url.split("\/");
      pathParts.forEach(function(element, index, array){
        if (element.startsWith(":")){
          var property = element.replace(":", "");
          if (param.hasOwnProperty(property)){
            array[index] = param[property];
            delete param[property];
          }else{
            array.splice(index, 1);
          }
        }
      });
      var path = pathParts.join("\/");
      if (!isEmpty(param)){
        var queryParam = Object.keys(param).map(function(key) {
          return key + " = " + param[key];
        }).join(",");
        path += (path.endsWith("\/")?"?":"/?" + queryParam);
      }
      return path;
    }

    function padLeft(input, len, pad) {
      input = input.toString();
      if (input.length >= len) return input;
      else {
        pad = (pad || 0).toString();
        return new Array(1 + len - input.length).join(pad) + input;
      }
    }

    function setaCamposInvalidos(form, msg) {
      (msg != undefined) ? setWarning(msg) : setWarning('Alguns campos não foram preenchidos corretamente.');

      angular.forEach(form.$error, function (field) {
        angular.forEach(field, function (errorField) {
          if (errorField != undefined) {
            errorField.$setTouched();
            errorField.$setDirty();
          }
        })
      });

      return $timeout(function () {
        angular.element("[name='" + form.$name + "']").find('.ng-invalid:visible:first').focus();
      });
    }
  }
});