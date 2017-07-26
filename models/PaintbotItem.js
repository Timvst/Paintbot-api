var keystone = require('keystone');
var Types = keystone.Field.Types;
// var modelCleanCyclic = require('./modelCleanCyclic');
// var jsonSelect = require('mongoose-json-select');
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');



/**
 * PaintbotItem Model
 * ==========
 */

var PaintbotItem = new keystone.List('PaintbotItem', {
	label: 'Paintbot Items',
	track: true,
	autokey: { path: 'output', from: 'story target', fixed: true, unique: true },
	map: { name: 'output' },
	defaultSort: 'createdAt',
	plural: 'items',
	singular: 'item',
});


PaintbotItem.add({
	output: { label: 'Bestandsnaam', type: Types.Text, initial: false, hidden: true, noedit: true },
	// Initial user input
	target: { label: 'Target', type: Types.Select, options: 'Begintitel, Balktitel, Fotozoom', default: 'Begintitel', initial: true, hidden: true},
	story: { label: 'Verhaal', type: Types.Text, default: 'verhaal', initial: true, hidden: true },


	// Secondary user input
	author: { label: 'Redacteur', type: Types.Text, default: 'videopool' },
	field1: { label: 'Regel 1', type: Types.Text },
	field2: { label: 'Regel 2', type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel', 'Begintitel'] } },
	field3: { label: 'Regel 3', type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel', 'Begintitel'] } },
	field4: { label: 'Regel 4', type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel'] } },
	field5: { label: 'Regel 5', type: Types.Text, collapse: true, dependsOn: { target: [''] } },
	field6: { label: 'Regel 6', type: Types.Text, collapse: true, dependsOn: { target: [''] } },

	imageObject: { label: 'Afbeelding', type: Types.CloudinaryImage, autoCleanup : true, folder: 'fotozoom', publicID: 'output', dependsOn: { target: 'Fotozoom' } },

	// Calculated fields
	toggle1: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle2: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle3: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle4: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle5: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle6: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	image1: { type: Types.Text, initial: false, hidden: true},
	toggleImage1: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},


	// RenderStatus is calculated
	renderStatus: { label: 'Render status', type: Types.Select, options: 'draft, ready, queued, processing, done', default: 'draft', index: true, hidden: false, noedit: true},
	module: { label: 'After Effects module', type:Types.Text, default:'Best Settings', initial: false, noedit: true},
	renderSettings: { label: 'After Effects render settings', type:Types.Text, default:'Avid DNxHD alpha', initial: false, noedit: true},

	// Final user input: promote item to ready for Paintbot
	ReadyToRender: { label: 'Verstuur naar de Paintbot', type: Boolean, default: false },

});

// Calculate toggle fields based on content
// PaintbotItem.schema.virtual('toggle1').get(function () {
// 	if (this.field1 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggle2').get(function () {
// 	if (this.field2 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggle3').get(function () {
// 	if (this.field3 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggle4').get(function () {
// 	if (this.field4 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggle5').get(function () {
// 	if (this.field5 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggle6').get(function () {
// 	if (this.field6 == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('toggleImage1').get(function () {
// 	if ( this.imageObject.secure_url == null ) {
// 		return '{{off}}'
// 	} else {
// 		return null
// 	};
// });
// PaintbotItem.schema.virtual('image1').get(function () {
// 	return this.imageObject.secure_url
// });

// Include virtuals in JSON payload
// PaintbotItem.schema.set('toJSON', {
//   virtuals: true,
// 	transform: modelCleanCyclic.transformer
// });

// Only include wanted fields in JSON payload
// PaintbotItem.schema.plugin(jsonSelect, '-_id id target output renderStatus author field1 field2 field3 field4 field5 field6 toggle1 toggle2 toggle3 toggle4 toggle5 toggle6 image1 toggleImage1');

// Promote item to ready based on user input
PaintbotItem.schema.pre('save', function(next) {
    if (this.ReadyToRender == true ) {
        this.renderStatus = 'ready'
				this.ReadyToRender = false
    };
		if (this.field1 == null ) {
			this.toggle1 = '{{off}}'
		} else {
			this.toggle1 = null
		};
		if (this.field2 == null ) {
			this.toggle2 = '{{off}}'
		} else {
			this.toggle2 = null
		};
		if (this.field3 == null ) {
			this.toggle3 = '{{off}}'
		} else {
			this.toggle3 = null
		};
		if (this.field4 == null ) {
			this.toggle4 = '{{off}}'
		} else {
			this.toggle4 = null
		};
		if (this.field5 == null ) {
			this.toggle5 = '{{off}}'
		} else {
			this.toggle5 = null
		};
		if (this.field6 == null ) {
			this.toggle6 = '{{off}}'
		} else {
			this.toggle6 = null
		};
		if (this.imageObject.secure_url == null) {
			this.image1 = null
			this.toggleImage1 = '{{off}}'
		} else {
			this.image1 = this.imageObject.secure_url
			this.toggleImage1 = null
		}
    next();
});

// How to render the table in de admin UI
PaintbotItem.defaultColumns = 'output, createdAt|25%, author|15%, renderStatus|15%';

PaintbotItem.register();
