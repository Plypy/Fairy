var keystone = require('keystone');
var _ = require('lodash');

var locals = {
  '_': _,
};

keystone.init({
  'name': 'Fairy',

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

  'locals': _,
});

require('./models');

keystone.set('routes', require('./routes'));
keystone.start();
