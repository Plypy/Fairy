var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
  res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
  var title;
  var message;
  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Load Routes
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

// Bind Routes
exports = module.exports = function(app) {
  app.get('/', routes.views.index);
  // app.get('/test', routes.views.test);

  app.get('/tasks', routes.api.tasks.get);
  app.post('/tasks', routes.api.tasks.add);
}
