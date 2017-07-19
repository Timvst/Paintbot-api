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
	target: { label: 'Template', type: Types.Select, options: 'Balktitel, Begintitel', default: 'Balktitel', index: true, initial: true, hidden: true },
	story: { label: 'Verhaal', type: Types.Text, default: 'verhaal', initial: true, hidden: true },

	// Secondary user input
	author: { label: 'Redacteur', type: Types.Text, default: 'videopool' },
	field1: { label: 'Regel 1',type: Types.Text },
	field2: { label: 'Regel 2',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field3: { label: 'Regel 3',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field4: { label: 'Regel 4',type: Types.Text, collapse: true, dependsOn: { target: ['Begintitel', 'Balktitel'] } },
	field5: { label: 'Regel 5',type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel'] } },
	field6: { label: 'Regel 6',type: Types.Text, collapse: true, dependsOn: { target: ['Balktitel'] } },
	ReadyToRender: { label: 'Verstuur naar de Paintbot', type: Boolean, default: false },

	// Not yet implemented
	//image1: { type: Types.CloudinaryImage, autoCleanup : true, hidden: true },
	//toggleImage1: { type: Boolean, folder: 'v1/images', default: false, hidden: true },
	//RenderSettings: { type: String, hidden: true }

	// Calculated fields
	output: { label: 'Bestandsnaam', type: Types.Text, noedit: true, initial: false, hidden: true, fixed: true },
	renderStatus: { type: Types.Select, options: 'draft, ready, queued, processing, done', default: 'draft', index: true, hidden: true, watch: 'ReadyToRender', value: (function(){
		if (this.ReadyToRender==true) {
			return 'ready'
		};
	})},
	toggle1: { type: String, default: '{{off}}', noedit: true, watch: 'field1', value: (function(){
			if (this.field1=='') {
				return '{{off}}'
			} else {
				return '{{on}}'
			};
		})
	},
	toggle2: { type: String, default: '{{off}}', noedit: true, watch: 'field2', value: (function(){
		if (this.field2=='') {
			return '{{off}}'
		} else {
			return '{{on}}'
		};
	})
	},
	toggle3: { type: String, default: '{{off}}', noedit: true, watch: 'field3', value: (function(){
		if (this.field3=='') {
			return '{{off}}'
		} else {
			return '{{on}}'
		};
	})
	},
	toggle4: { type: String, default: '{{off}}', noedit: true, watch: 'field4', value: (function(){
		if (this.field4=='') {
			return '{{off}}'
		} else {
			return '{{on}}'
		};
	})
	},
	toggle5: { type: String, default: '{{off}}', noedit: true, watch: 'field5', value: (function(){
		if (this.field5=='') {
			return '{{off}}'
		} else {
			return '{{on}}'
		};
	})
	},
	toggle6: { type: String, default: '{{off}}', noedit: true, watch: 'field6', value: (function(){
		if (this.field6=='') {
			return '{{off}}'
		} else {
			return '{{on}}'
		};
	})
	},

});

PaintbotItem.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// How to render the table in de admin UI
PaintbotItem.defaultColumns = 'output, createdAt|25%, author|15%, renderStatus|15%';

PaintbotItem.register();
