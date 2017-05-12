define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controllers/form');
  require('./controllers/list');
  require('./factories/service');
  require('./resources/rest');
  require('./resources/search');
  require('./states');

  require('./templatesCache');
  return module;

});
