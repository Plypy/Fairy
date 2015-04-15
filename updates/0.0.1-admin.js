var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (done) {
  new User.model({
    name: {first: 'Secret', last: 'Fire'},
    email: 'me@plypy.com',
    password: 'admin',
    canAccessKeystone: true,
  }).save(done);
}