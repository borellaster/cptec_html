define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/form');
  require('./controllers/download');
  require('./controllers/modal');
  require('./factories/service');
  require('./resources/rest');
  require('./states');

  return module;

});
