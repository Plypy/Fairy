var keystone = require('keystone');
var Types = keystone.Field.Types;

var Task = new keystone.List('Task');

Task.add({
  title: {type: String, required: true, index: true, initial: true},
  due: {type: Date, required: true, initial: true},
  createdAt: {type: Date, default: Date.now},
  // author
});

Task.register();
