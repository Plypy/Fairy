var keystone = require('keystone');
var async = require('async');
var moment = require('moment');

var Task = keystone.list('Task');

// get time difference in days
var diffDays = function (st, ed) {
  var st = moment(st);
  var ed = moment(ed);
  return Math.ceil(ed.diff(st, 'days', true));
};

// translate a mongoose object into a task-bar object
var translate = function (task) {
  var rem = diffDays(Date.now(), task.due);
  var tot = diffDays(task.createdAt, task.due);
  var per = Math.round(100.0*rem/tot);
  return {
    title: task.title,
    id: task._id,
    remain: rem,
    percentage: per,
  };
};

var lucy = [
  {name: 'Fairy', id: '123', remain: 10, percentage: 60},
  {name: 'Lucy', id: '321', remain: 2, percentage: 20},
]

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  Task.model.find(function (err, tasks) {
    console.log('original');
    console.log(tasks);
    async.map(tasks, function (task, callback) {
      return callback(null, translate(task));
    }, function (err, results) {
      async.filter(results, function (item, cb) {
        return cb(item.remain >= 0);
      }, function (results) {
        console.log(results);
        view.render('index', {
          tasks: results,
        });
      });
    });
  });
}
