/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'About Us', key: 'about', subLinks: [
			{ label: 'A Brief History', key: 'about', href: "/about/who-we-are"},
			{ label: 'What We Do', key: 'about', href: "/about/what-we-do"},
			{ label: 'Message from the CEO and President', key: 'about', href: "/about/message-from-ceo-and-president"},
			{ label: 'Message from the Vice President for Operations', key: 'about', href: "/about/message-from-vpo"}
		]},
		{ label: 'Clients', key: 'clients', subLinks: [
		    { label: 'List of Clients', key: 'clients', href: '/clients#kingdom-of-saudi-arabia'},
		    { label: 'Doing Business With Us', key: 'clients', href: "/clients/doing-business-with-us"}
		]},
		{ label: 'Jobs', key: 'jobs', href:"/jobs#oil-and-gas" },
		{ label: 'Bulletin', key: 'news', href: '/news' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;

	Promise.all([
		keystone.list('Story').model.find().where("active",true).sort('sortOrder').limit(3).exec(),
		keystone.list('JobCategory').model.find().sort('sortOrder').limit(10).exec(),
		keystone.list('Client').model.find().sort('name').limit(30).exec()
	]).then(function([stories,jobCategories,clients]){
				res.locals.stories = stories || [];
				res.locals.jobCategories = jobCategories || [];
				res.locals.clients = clients || [];
				next();
	},function(err){
			console.log(err);
			next(err);
	})

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

exports.initErrorHandlers = function(req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }

    next();

};
