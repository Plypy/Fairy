var keystone = require('keystone');
var _ = require('lodash');
var moment = require('moment');
var jade = require('jade');
var path = require('path');
var async = require('async');

var Task = keystone.list('Task');

// add new task
exports.add = function(req, res) {
  var body = req.body;
  console.log(body);
  var due = moment(req.body.due, 'MM/DD/YYYY');
  if (_.isEmpty(body.title) && !due.isValid()) {
    return res.jsonp('fail');
  }
  var newTask = new Task.model({
    title: body.title,
    due: due.toDate(),
  });
  newTask.save(function (err) {
    if (err) {
      return res.jsonp('fail');
    }
    return res.jsonp('success');
  });
};

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

// get all tasks
exports.get = function (req, res) {
  Task.model.find(function (err, tasks) {
    async.map(tasks, function (task, callback) {
      return callback(null, translate(task));
    }, function (err, raw) {
      async.filter(raw, function (item, cb) {
        return cb(item.remain >= 0);
      }, function (results) {
        var p = path.join(__dirname, './tasks.jade');
        var html = jade.renderFile(p, {tasks: results });
        console.log(html);
        res.jsonp(html);
      });
    });
  });
};