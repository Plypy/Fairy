var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);

  view.render('index', {
    tasks: [
      {name: 'Fairy', id: '123', remain: 10, percentage: 60},
      {name: 'Lucy', id: '321', remain: 2, percentage: 20},
    ]
  });

}
