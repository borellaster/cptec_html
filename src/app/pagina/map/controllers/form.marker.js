define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('MapMarkerCtrl', MapMarkerCtrl);

  MapMarkerCtrl.$inject = ['$state', '$stateParams', '$location', 'MapFactory', 'VariablesFactory', 'leafletData'];
  function MapMarkerCtrl($state, params, $location, dataService, dataServiceVariable, leafletData ) {
    var vm = this;    

    vm.savedItems = [{
        "id": 721,
            "geoJSON": {
            "type": "Feature",
                "geometry": {
                "type": "Point",
                    "coordinates": [-0.626220703125,
                48.1367666796927]
            }
        }
    }, {
        "id": 724,
            "geoJSON": {
            "type": "Feature",
                "geometry": {
                "type": "Point",
                    "coordinates": [-0.274658203125,
                49.13859653703879]
            }
        }
    }];
    var drawnItems = new L.FeatureGroup();
    for (var i = 0; i < vm.savedItems.length; i++) {
        L.geoJson(vm.savedItems[i].geoJSON, {
            style: function(feature) {
                return {
                    color: '#bada55'
                };
            },
            onEachFeature: function (feature, layer) {
                drawnItems.addLayer(layer);
            }
        });
    }

    angular.extend(vm, {
        center: {
            lat: -17.518344,
            lng: -52.207031,
            zoom: 4
        },
        controls: {
            draw: {
                draw: {
                    polyline:false,
                    polygon:false,
                    circle:false,
                    rectangle:false,
                    marker: true
                },
            },
            edit: {
                featureGroup: drawnItems
            }
        }
    });


    leafletData.getMap().then(function (map) {
        var drawnItems = vm.controls.edit.featureGroup;
        drawnItems.addTo(map);
        map.on('draw:created', function (e) {
            var layer = e.layer;
            drawnItems.addLayer(layer);

            vm.savedItems.push({
                id: layer._leaflet_id,
                geoJSON: layer.toGeoJSON()
            });
        });

        map.on('draw:edited', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {

                for (var i = 0; i < vm.savedItems.length; i++) {
                    if (vm.savedItems[i].id == layer._leaflet_id) {
                        vm.savedItems[i].geoJSON = layer.toGeoJSON();
                    }
                }
            });
        });

        map.on('draw:deleted', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                for (var i = 0; i < vm.savedItems.length; i++) {
                    if (vm.savedItems[i].id == layer._leaflet_id) {
                        vm.savedItems.splice(i, 1);
                    }
                }
            });
        });
    });

    dataServiceVariable.combo().then(function success(data) {
      vm.variables = data;
    }).catch(function error(msg) {
      setError('Erro ao carregar variáveis.')
    }); 

    vm.loadData = function () {
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
      dataService.list(vm.requisicao.longitude,vm.requisicao.latitude, getVariables()).then(function success(result) {
        vm.result = result;          
      }).catch(function error(msg) {
        setError('Erro ao pesquisar os registros.');
      });      
    } 

    //-28.263/-52.407/('OCIS')

    function getVariables() {
      var str = "(";
      var values = vm.requisicao.variables;      
      angular.forEach(values, function(value, key) {
        str += "'"+ value.nickname +"'," 
      }); 
      str = str.substring(0, str.length -1);
      str += ")";      
      console.log(str);
      
      return str;
    };     



               

  }
});