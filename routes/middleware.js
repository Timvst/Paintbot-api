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
require('dotenv').config();


var keystone = require('keystone');
var Key = keystone.list('Key');

/**
  Sets navigation and enforces permissions specified in the user models
	https://gist.github.com/tmaclean-LV/919886cb2830da6a5710d35abbce46f4
 */
// exports.enforcePermissions = function (req, res, next) {
// 	var nav = {
// 		Paintbot: 'PaintbotItem',
// 		User: 'User',
// 		Template: ['Template','Key']
// 	};
// 	keystone.set('nav', nav);
// 	if (req.user) {
// 		// This assumes users have a set of boolean fields, "permBlog", "permAbout", etc.
// 		// which control access to these sets of navigation items.
// 		var hideLists = (name, hidden) => keystone.list(name).set('hidden', hidden);
// 		['Template','Key'].map(list => hideLists(list, !req.user.permTemplates));
// 		!req.user.permTemplates && delete nav.template;
// 		keystone.nav = keystone.initNav(nav);
// 	}
// 	next();
// };


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
	];
	res.locals.user = req.user;
	next();
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

/**
	Checks if key in POST request is present in database
 */
exports.checkAPIKey = function (req, res, next) {
	Key.model.find()
		.where('apiKey', req.get('x-api-key'))
		.select('apiKey')
		.exec(function(err, keys) {
			if (keys.length == 1) {
				console.log(keys)
				next();
			} else {
				res.status(401)
				res.json('not authorized')
			}
		});
};
