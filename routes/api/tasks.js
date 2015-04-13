var keystone = require('keystone');

exports = module.exports = function(req, res) {
  console.log(req.body);
  res.jsonp({str:'cpy'});
}
