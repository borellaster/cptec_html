define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/form');
  require('./controllers/form.marker');
  require('./factories/service');
  require('./resources/rest');
  require('./states');

  return module;

});
