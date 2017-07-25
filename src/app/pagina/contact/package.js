define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/form');
  require('./resources/rest');
  require('./factories/service');
  require('./states');

  return module;

});
