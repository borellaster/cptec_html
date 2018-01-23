define(function(require) {
  'use strict';

  var module = require('../module');
  module.controller('ModalController', ModalController);
  ModalController.$inject = ['$modal', '$rootScope', '$modalInstance'];
  function ModalController($modal, $rootScope, $modalInstance) {
    var vm = this; 
    vm.savedItems = [];
    setTimeout(function(){
      var aux = 0;
      var mymap = L.map('mapid').setView([-16.77, -63.85], 3);

      var polygon = new L.polygon([
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ]).addTo(mymap);

      var writtenPolygon = new L.polygon([
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ]).addTo(mymap);

      var polygonLimits = new L.polygon([
            [-50.1000000,-100.1000000],
            [27.9000000,-100.1000000],
            [27.9000000,-29.1000000],
            [-50.1000000, -29.1000000]],{
              color: 'red',
              fillColor: "transparent",
              weight: 0.4
            }
        ).addTo(mymap);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);

      var drawnItems = new L.FeatureGroup();

      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          poly: {
            allowIntersection: false
          }
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          },
          polyline: false,
          circle: false,
          marker: false,
          rectangle: true,
          polygon: false,
        }
      });
      mymap.addControl(drawControl);

      mymap.on('draw:created', function (event) {
        var layer = event.layer;
        vm.savedItems.push({
            id: layer._leaflet_id,
            geoJSON: layer.toGeoJSON()
        });        
        //console.log(JSON.stringify(vm.savedItems));
        clearMap();
        var polygonLimits = new L.polygon([
            [-50.1000000,-100.1000000],
            [27.9000000,-100.1000000],
            [27.9000000,-29.1000000],
            [-50.1000000, -29.1000000]],{
              color: 'red',
              fillColor: "transparent",
              weight: 0.4
            }
        ).addTo(mymap);
        polygon = L.polygon([
            [layer._latlngs[0].lat, layer._latlngs[0].lng],
            [layer._latlngs[1].lat, layer._latlngs[1].lng],
            [layer._latlngs[2].lat, layer._latlngs[2].lng],
            [layer._latlngs[3].lat, layer._latlngs[3].lng]
        ]).addTo(mymap);

        for(var i=0;i<=layer._latlngs.length-1;i++) {
          if(layer._latlngs[i].lat < -50.1 || layer._latlngs[i].lng < -100.1 || layer._latlngs[i].lat > 27.9 || layer._latlngs[i].lng > -29.1){
            mymap.removeLayer(polygon);
            setWarning('Você selecionou uma área indisponível.');//alert("Você selecionou uma área indisponível")
            break;
          }          
        }        

        $rootScope.$emit("latitudeCima", layer._latlngs[1].lat);
        $rootScope.$emit("latitudeBaixo", layer._latlngs[0].lat);
        $rootScope.$emit("longitudeEsquerda", layer._latlngs[0].lng);
        $rootScope.$emit("longitudeDireita", layer._latlngs[2].lng);    
        $rootScope.$emit("savedItems", vm.savedItems);           
      });

      vm.clearCoordinates = function(){
        mymap.removeLayer(polygon);
        vm.latitudeCima = " ";
        vm.latitudeBaixo = " ";
        vm.longitudeEsquerda = " ";
        vm.longitudeDireita = " ";
        $rootScope.$emit("latitudeCima", undefined);
        $rootScope.$emit("latitudeBaixo", undefined);
        $rootScope.$emit("longitudeEsquerda", undefined);
        $rootScope.$emit("longitudeDireita", undefined);
      }

      function clearMap() {
        for(var i in mymap._layers) {
          if(mymap._layers[i]._path != undefined) {
            try {
              mymap.removeLayer(mymap._layers[i]);
            }
            catch(e) {              
            }
          }
        }
      }

    }, 200);  

    vm.save = function() {
      $modalInstance.dismiss('cancel');
    };

    vm.close = function() {
      $modalInstance.dismiss('cancel');
      $rootScope.$emit("latitudeCima", undefined);
      $rootScope.$emit("latitudeBaixo", undefined);
      $rootScope.$emit("longitudeEsquerda", undefined);
      $rootScope.$emit("longitudeDireita", undefined);      
    };    
    
	}
});