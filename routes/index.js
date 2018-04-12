/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

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
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
				console.log(message,err);
    }
    res.err(err, title, message);
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	json: importRoutes('./json')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/news/:category?', routes.views.news);
	app.get('/news/post/:post', routes.views.post);
	app.get("/about/what-we-do", routes.views.whatwedo);
	app.get("/about/who-we-are", routes.views.whoweare);
	app.get("/about/message-from-ceo-and-president", routes.views.messagefromceo);
	app.get("/about/message-from-vpo", routes.views.messagefromvpo);
	app.get("/clients",routes.views.clients);
	app.get("/clients/doing-business-with-us",routes.views.doingbusinesswithus);
	app.get("/clients/doing-business-with-us/accreditation-documents",routes.views.accreditationdocuments);
	app.get("/json/chart",routes.json.chart);
	app.all("/jobs", routes.views.jobs);
	//app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
