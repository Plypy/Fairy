var keystone = require('keystone');
var _ = require('lodash');
var moment = require('moment');

var Task = keystone.list('Task');

exports = module.exports = function(req, res) {
  var body = req.body;
  console.log(body);
  var due = moment(req.body.due, 'MM/DD/YYYY');
  if (_.isEmpty(body.content) && !due.isValid()) {
    return res.jsonp('fail');
  }
  var newTask = new Task.model({
    title: body.content,
    due: due.toDate(),
  });
  newTask.save(function (err) {
    if (err) {
      return res.jsonp('fail');
    }
    return res.jsonp('success')
  });
}
