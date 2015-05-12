var keystone = require('keystone');
var async = require('async');
var moment = require('moment');
var utils = require('../utils');

var Task = keystone.list('Task');

// magical variables
var lucy = [
  {name: 'Fairy', id: '123', remain: 10, percentage: 60},
  {name: 'Lucy', id: '321', remain: 2, percentage: 20},
];

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  Task.model.find(function (err, tasks) {
    async.map(tasks, function (task, callback) {
      return callback(null, utils.translate(task));
    }, function (err, results) {
      async.filter(results, function (item, cb) { // only show tasks active
        return cb(item.remain >= 0);
      }, function (results) {
        view.render('index', {
          tasks: results,
        });
      });
    });
  });
};
