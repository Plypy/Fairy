var keystone = require('keystone');
var async = require('async');
var moment = require('moment');

var Tasks = keystone.list('Task');

// get time difference in days
var diffDays = function (st, ed) {
  var st = moment(st);
  var ed = moment(ed);
  return ed.diff(st, 'days');
};

// translate a mongoose object into a task-bar object
var translate = function (task) {
  var rem = diffDays(Date.now(), task.due);
  var tot = diffDays(task.createdAt, task.due);
  var per = Math.round(100.0*rem/tot);
  return {
    name: task.title,
    id: task._id,
    remain: diffDays(Date.now(), task.due),
    percentage: per,
  };
};

var lucy = [
  {name: 'Fairy', id: '123', remain: 10, percentage: 60},
  {name: 'Lucy', id: '321', remain: 2, percentage: 20},
]

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  Tasks.model.find(function (err, tasks) {
    async.map(tasks, function (task, callback) {
      return callback(null, translate(task));
    }, function (err, results) {
      console.log(results);
      view.render('index', {
        tasks: results,
      });
    });
  });
}
