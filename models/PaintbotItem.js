var keystone = require('keystone');
var Types = keystone.Field.Types;



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
	plural: 'paintbotItem',
	singular: 'paintbotItems'
});


PaintbotItem.add({
	// Initial user input
	target: { label: 'Target', type: Types.Select, options: 'Begintitel, Balktitel, Fotozoom', default: 'Begintitel', initial: true, hidden: true},
	story: { label: 'Verhaal', type: Types.Text, default: 'verhaal', initial: true, hidden: true },

	// Secondary user input
	author: { label: 'Redacteur', type: Types.Text, default: 'videopool' },
	field1: { label: 'Regel 1',type: Types.Text },
	field2: { label: 'Regel 2',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field3: { label: 'Regel 3',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field4: { label: 'Regel 4',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field5: { label: 'Regel 5',type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel'] } },
	field6: { label: 'Regel 6',type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel'] } },

	image1: { type: Types.CloudinaryImage, autoCleanup : true, folder: 'fotozoom', publicID: 'output', dependsOn: { target: 'Fotozoom' } },


	// RenderStatus is calculated
	renderStatus: { type: Types.Select, options: 'draft, ready, queued, processing, done', default: 'draft', index: true, hidden: false, noedit: true},

	// Final user input: promote item to ready for Paintbot
	ReadyToRender: { label: 'Verstuur naar de Paintbot', type: Boolean, default: false },

	// Calculated fields
	output: { label: 'Bestandsnaam', type: Types.Text, noedit: true, initial: false, hidden: true, fixed: true },

	// toggle1: { type: String, default: '{{off}}', noedit: true, watch: 'field1', value: (function(){
	// 		if (this.field1=='') {
	// 			return '{{off}}'
	// 		} else {
	// 			return '{{on}}'
	// 		};
	// 	})
	// },
	// toggle2: { type: String, default: '{{off}}', noedit: true, watch: 'field2', value: (function(){
	// 	if (this.field2=='') {
	// 		return '{{off}}'
	// 	} else {
	// 		return '{{on}}'
	// 	};
	// })
	// },
	// toggle3: { type: String, default: '{{off}}', noedit: true, watch: 'field3', value: (function(){
	// 	if (this.field3=='') {
	// 		return '{{off}}'
	// 	} else {
	// 		return '{{on}}'
	// 	};
	// })
	// },
	// toggle4: { type: String, default: '{{off}}', noedit: true, watch: 'field4', value: (function(){
	// 	if (this.field4=='') {
	// 		return '{{off}}'
	// 	} else {
	// 		return '{{on}}'
	// 	};
	// })
	// },
	// toggle5: { type: String, default: '{{off}}', noedit: true, watch: 'field5', value: (function(){
	// 	if (this.field5=='') {
	// 		return '{{off}}'
	// 	} else {
	// 		return '{{on}}'
	// 	};
	// })
	// },
	// toggle6: { type: String, default: '{{off}}', noedit: true, watch: 'field6', value: (function(){
	// 	if (this.field6=='') {
	// 		return '{{off}}'
	// 	} else {
	// 		return '{{on}}'
	// 	};
	// })
	// },



});

// Calculate toggle fields based on content
PaintbotItem.schema.virtual('toggle1').get(function () {
	if (this.field1=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggle2').get(function () {
	if (this.field2=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggle3').get(function () {
	if (this.field3=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggle4').get(function () {
	if (this.field4=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggle5').get(function () {
	if (this.field5=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggle6').get(function () {
	if (this.field6=='') {
		return '{{off}}'
	} else {
		return ''
	};
});
PaintbotItem.schema.virtual('toggleImage1').get(function () {
	if (this.image1=='') {
		return '{{off}}'
	} else {
		return ''
	};
});

// Promote item to ready based on user input
PaintbotItem.schema.pre('save', function(next) {
    if (this.ReadyToRender == true ) {
        this.renderStatus = 'ready'
				this.ReadyToRender = false
    }
    next();
});





// How to render the table in de admin UI
PaintbotItem.defaultColumns = 'output, createdAt|25%, author|15%, renderStatus|15%';

PaintbotItem.register();
