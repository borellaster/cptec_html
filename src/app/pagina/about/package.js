define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/form');
  //require('./factories/service');
  //require('./resources/rest');
  require('./states');

  return module;

});
