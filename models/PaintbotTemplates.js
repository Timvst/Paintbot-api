var keystone = require('keystone');

/**
 * PaintbotTemplates Model
 * ==================
 */

var PaintbotTemplates = new keystone.List('PaintbotTemplates', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PaintbotTemplates.add({
	name: { type: String, required: true },
	//fields: { type: Types.Select, options: '1,2,3,4,5,6', default: '6', required: true },
	//image: { type: Boolean, default: false, required: true },
});


PaintbotTemplates.register();
