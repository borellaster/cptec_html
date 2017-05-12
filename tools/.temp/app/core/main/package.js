define(function(require) {
  'use strict';

  var module = require('./module');
  require('./controller');
  require('./services');
  require('./states');

  require('./templatesCache');
  return module;

});
