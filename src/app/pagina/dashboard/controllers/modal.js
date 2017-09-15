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

        console.log(vm.savedItems);
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

        $rootScope.$emit("latitudeCima", layer._latlngs[1].lat);
        $rootScope.$emit("latitudeBaixo", layer._latlngs[0].lat);
        $rootScope.$emit("longitudeEsquerda", layer._latlngs[0].lng);
        $rootScope.$emit("longitudeDireita", layer._latlngs[2].lng);    
        $rootScope.$emit("savedItems", vm.savedItems);           
      });

      vm.visualizeMap = function(){
        if(vm.latitudeBaixo < -50.1 || vm.longitudeEsquerda < -100.1 || vm.latitudeCima > 27.9 || vm.longitudeDireita > -29.1){
          alert("Você selecionou uma área indisponível")
          vm.clearCoordinates();
        }else
        {
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

          vm.mapVis = 1;

          var writtenSQ = [
          [vm.latitudeBaixo,vm.longitudeEsquerda],
          [vm.latitudeCima,vm.longitudeEsquerda],
          [vm.latitudeCima,vm.longitudeDireita],
          [vm.latitudeBaixo,vm.longitudeDireita]];

          var writtenPolygon = L.polygon(writtenSQ).addTo(mymap);
        }
      }

      vm.mapVis = 0;
      vm.openMap = function(){
        vm.clearCoordinates();
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

        vm.mapVis = 1;
      }
      
      vm.closeMap = function(){
        vm.mapVis = 0;
      }

      vm.clearCoordinates = function(){
        mymap.removeLayer(polygon);
        vm.latitudeCima = " ";
        vm.latitudeBaixo = " ";
        vm.longitudeEsquerda = " ";
        vm.longitudeDireita = " ";
      }

      function clearMap() {
        for(var i in mymap._layers) {
          if(mymap._layers[i]._path != undefined) {
            try {
              mymap.removeLayer(mymap._layers[i]);
            }
            catch(e) {
              console.log("problem with " + e + mymap._layers[i]);
            }
          }
        }
      }

    }, 200);  

    vm.hide = function() {
      $modalInstance.dismiss('cancel');
    };
    
	}
});