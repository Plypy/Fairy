var keystone = require('keystone');
var _ = require('lodash');

var locals = {
  '_': _,
};

keystone.init({
  'name': 'Fairy',
  'favicon': 'public/favicon.ico',

  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': 'mongodb://fairy:tale@localhost/Fairy',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'secret',

  'locals': locals,
});

require('./models');

keystone.set('routes', require('./routes'));
keystone.start();
