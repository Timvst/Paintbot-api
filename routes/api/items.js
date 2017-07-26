var async = require('async'),
	keystone = require('keystone'),
	humps = require('humps');

var PaintbotItem = keystone.list('PaintbotItem');

var whitelist = '-_id target output renderStatus author field1 field2 field3 field4 field5 field6 toggle1 toggle2 toggle3 toggle4 toggle5 toggle6 image1 toggleImage1';



exports.list = function(req, res) {
	PaintbotItem.model.find()
		.lean()
		.select(whitelist)
		.exec(function(err, items) {
		if (err) {
						console.log('Error loading items', err);
					}
		if (items) {
			var payload = humps.decamelizeKeys(items, {separator: '-', split: /(?=[A-Z0-9])/});
			res.json(payload)
		}

	});
}

exports.ready = function(req, res) {
	PaintbotItem.model.find()
		.lean()
		.select(whitelist)
		.where('renderStatus', 'ready')
		.exec(function(err, items) {
		if (err) {
						console.log('Error loading items', err);
					}
		if (items) {
			var payload = humps.decamelizeKeys(items, {separator: '-', split: /(?=[A-Z0-9])/});
			res.json(payload)
		}

	});
}
