var moment = require('moment');
// get time difference in days
var diffDays = function (st, ed) {
  var st = moment(st).startOf('day'); // truncate
  var ed = moment(ed).startOf('day');
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

exports.diffDays = diffDays;
exports.translate = translate;