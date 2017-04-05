define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/login');
  require('./controllers/token');
  require('./resources/rest');
  require('./resources/rest.forgot');
  require('./factories/service');
  require('./states');

  return module;

});
