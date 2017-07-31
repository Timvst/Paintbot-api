/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name.first': 'Tim', 'name.last': 'van Steenbergen', 'email': 'tim.van.steenbergen@nos.nl', 'password': 'Waterschade', 'isAdmin': true, 'permTemplates': true },
		{ 'name.first': 'Mariette', 'name.last': 'Twilt', 'email': 'mariette.twilt@nos.nl', 'password': 'Isometrisch', 'isAdmin': true, 'permTemplates': true },
		{ 'name.first': 'Ben', 'name.last': 'Prins', 'email': 'ben.prins@nos.nl', 'password': 'Thehoff', 'isAdmin': true, 'permTemplates': true },
		{ 'name.first': 'Stijn', 'name.last': 'Postmus', 'email': 'stijn.postmus@nos.nl', 'password': 'Otes', 'isAdmin': true, 'permTemplates': true },
		{ 'name.first': 'Video', 'name.last': 'Pool', 'email': 'digidesk@nos.nl', 'password': 'Thumbnail', 'isAdmin': true, 'permTemplates': false },
	],
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin (admin, done) {

	var newAdmin = new User.model(admin);

	newAdmin.isAdmin = true;
	newAdmin.save(function (err) {
		if (err) {
			console.error('Error adding admin ' + admin.email + ' to the database:');
			console.error(err);
		} else {
			console.log('Added admin ' + admin.email + ' to the database.');
		}
		done(err);
	});

}

exports = module.exports = function (done) {
	async.forEach(admins, createAdmin, done);
};

*/
