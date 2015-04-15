var keystone = require('keystone');
var _ = require('lodash');
var conf = require('./conf');

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
  'mongo': conf.mongoURI,

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'secret',

  'locals': locals,
  'port': conf.port || 3000,
});

require('./models');

keystone.set('routes', require('./routes'));
keystone.start();
