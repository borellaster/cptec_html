define(function(require) {
  'use strict';

  var module = require('./module');
  module.controller('PaginaHomeCtrl', PaginaHomeCtrl);

  PaginaHomeCtrl.$inject = ['$timeout'];

  function PaginaHomeCtrl($timeout) {
    var vm = this;


    vm.center = {
        lat: -17.518344,
        lng: -52.207031,
        zoom: 4
    };

    vm.tiles = {
        name: 'Mapbox Park',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiZmVlbGNyZWF0aXZlIiwiYSI6Ik1Gak9FXzAifQ.9eB142zVCM4JMg7btDDaZQ',
            mapid: 'feelcreative.llm8dpdk'
        }
    };

    vm.legend = {
        position: 'bottomleft',
        colors: ['#FFFF00', '#FF0000', '#FF0000', '#FF0000'],
        labels: ['Soja voluntária', '1-9 ocorrências', '10-99 ocorrências', '> 99 ocorrências']
    };
  }
});