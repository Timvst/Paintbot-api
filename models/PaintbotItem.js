var keystone = require('keystone'),
_ = require('lodash'),
utils = require('keystone-utils');
var Types = keystone.Field.Types;


/**
 * PaintbotItem Model
 * ==========
 */

var PaintbotItem = new keystone.List('PaintbotItem', {
	label: 'Paintbot Items',
	track: true,
	autokey: { path: 'output', from: 'target story', fixed: true, unique: true },
	map: { name: 'output' },
	defaultSort: 'createdAt',
	plural: 'items',
	singular: 'item',
});

PaintbotItem.add({
	// Unique identifier field
	output: { label: 'Bestandsnaam', type: Types.Text, initial: false, hidden: true, noedit: true },
	// Initial user input
	template: { label: 'Template', type: Types.Relationship, ref: 'Template', refPath: 'name', initial: true, hidden: true },
	story: { label: 'Verhaal', type: Types.Text, initial: true, hidden: true },

	// Inherited fields from template
	whichfields: { type: Types.Text, initial: false, noedit: true, watch: 'story', value: templateToWhichFields, hidden: true },
	whichimages: { type: Types.Text, initial: false, noedit: true, watch: 'story', value: templateToWhichImages, hidden: true },
	maxchars: { type: Types.Text, initial: false, noedit: true, watch: 'story', value: templateToMaxChars, hidden: true },

	// Secondary user input
	author: { label: 'Redacteur', type: Types.Text, default: 'videopool' },
	field1: { label: 'Regel 1', type: Types.Text, dependsOn: { whichfields: ['1','2','3','4','5','6','7','8','9','10'] } },
	field2: { label: 'Regel 2', type: Types.Text, dependsOn: { whichfields: ['2','3','4','5','6','7','8','9','10'] }, collapse: true },
	field3: { label: 'Regel 3', type: Types.Text, dependsOn: { whichfields: ['3','4','5','6','7','8','9','10'] }, collapse: true },
	field4: { label: 'Regel 4', type: Types.Text, dependsOn: { whichfields: ['4','5','6','7','8','9','10'] }, collapse: true },
	field5: { label: 'Regel 5', type: Types.Text, dependsOn: { whichfields: ['5','6','7','8','9','10'] }, collapse: true },
	field6: { label: 'Regel 6', type: Types.Text, dependsOn: { whichfields: ['6','7','8','9','10'] }, collapse: true },
	field7: { label: 'Regel 7', type: Types.Text, dependsOn: { whichfields: ['7','8','9','10'] }, collapse: true },
	field8: { label: 'Regel 8', type: Types.Text, dependsOn: { whichfields: ['8','9','10'] }, collapse: true },
	field9: { label: 'Regel 9', type: Types.Text, dependsOn: { whichfields: ['9','10'] }, collapse: true },
	field10: { label: 'Regel 10', type: Types.Text, dependsOn: { whichfields: ['10'] }, collapse: true },
	// Images
	image1: { type: Types.Text, initial: false, hidden: true},
	image2: { type: Types.Text, initial: false, hidden: true},
	image3: { type: Types.Text, initial: false, hidden: true},
	image4: { type: Types.Text, initial: false, hidden: true},
	image5: { type: Types.Text, initial: false, hidden: true},
	// Image objecs
	imageObject1: { label: 'Afbeelding 1', type: Types.CloudinaryImage, autoCleanup : true, folder: 'PaintbotV1', publicID: 'output', dependsOn: { whichimages: ['1','2','3','4','5'] } },
	imageObject2: { label: 'Afbeelding 2', type: Types.CloudinaryImage, autoCleanup : true, folder: 'PaintbotV1', publicID: 'output', dependsOn: { whichimages: ['2','3','4','5'] } },
	imageObject3: { label: 'Afbeelding 3', type: Types.CloudinaryImage, autoCleanup : true, folder: 'PaintbotV1', publicID: 'output', dependsOn: { whichimages: ['3','4','5'] } },
	imageObject4: { label: 'Afbeelding 5', type: Types.CloudinaryImage, autoCleanup : true, folder: 'PaintbotV1', publicID: 'output', dependsOn: { whichimages: ['4','5'] } },
	imageObject5: { label: 'Afbeelding 5', type: Types.CloudinaryImage, autoCleanup : true, folder: 'PaintbotV1', publicID: 'output', dependsOn: { whichimages: ['5'] } },



	// Calculated fields
	target: { label: 'Target from template', type: Types.Text, initial: false, hidden: true, watch: 'story', value: templateToTarget },
	toggle1: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle2: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle3: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle4: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle5: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle6: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle7: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle8: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle9: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggle10: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggleImage1: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggleImage2: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggleImage3: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggleImage4: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},
	toggleImage5: { type: Types.Text, default: '{{off}}', initial: false, hidden: true},


	// RenderStatus is calculated
	renderStatus: { label: 'Render status', type: Types.Select, options: 'draft, ready, queued, processing, done', default: 'draft', index: true, hidden: true},


	// Final user input: promote item to ready for Paintbot
	ReadyToRender: { label: 'Verstuur naar de Paintbot', type: Boolean, default: false },

	// instructions
},'Instructies',{
	instructions: { label: 'Gebruiksaanwijzing', type: Types.Textarea, watch: 'story', value: templateToInstructions, initial: false, noedit: true, height: 200},
	example: { label: 'Voorbeeld', type: Types.Url, watch: 'story', value: templateToExample, noedit: true },
});

// PaintbotItem.schema.pre('save', function(next) {
// 	var Template = keystone.list('Template');
// 	Template.model.findOne()
// 		.where('_id', this.template)
// 		.exec(function(err, item) {
// 				this.target = _.kebabCase(item.name);
// 				this.whichfields = item.selectfields;
// 				this.maxchars = item.max;
// 				this.whichimages = item.selectimages;
// 				console.log(
// 					'target: '+this.target+' '+
// 					'fields: '+this.whichfields+' '+
// 					'chars: '+this.maxchars+' '+
// 					'images: '+this.whichimages
// 				)
// 			});
// 			next();
// });


function templateToTarget(callback) {
	var Templates = keystone.list('Template');
	// Set target field from Relationship
	Templates.model.findOne()
						.where('_id', this.template)
						.exec(function(err, item) {
								callback(err, _.kebabCase(item.name));
					});
};

function templateToWhichFields(callback) {
	var Templates = keystone.list('Template');
	// Set target field from Relationship
		Templates.model.findOne()
			.where('_id', this.template)
			.exec(function(err, item) {
					callback(err, item.selectfields);
				});
};

function templateToWhichImages(callback) {
	var Templates = keystone.list('Template');
	// Set target field from Relationship
		Templates.model.findOne()
			.where('_id', this.template)
			.exec(function(err, item) {
					callback(err, item.selectimages);
				});
};

function templateToMaxChars(callback) {
	var Templates = keystone.list('Template');
	// Set target field from Relationship
		Templates.model.findOne()
			.where('_id', this.template)
			.exec(function(err, item) {
						callback(err, item.max);
				});
};

function templateToInstructions(callback) {
	var Templates = keystone.list('Template');
	Templates.model.findOne()
		.where('_id', this.template)
		.exec(function(err, item) {
					callback(err, item.instructions);
			});
};

function templateToExample(callback) {
	var Templates = keystone.list('Template');
	Templates.model.findOne()
		.where('_id', this.template)
		.exec(function(err, item) {
					callback(err, item.example.secure_url);
			});
};


PaintbotItem.schema.pre('save', function(next) {
		// Calculated toggle fields based on field content
		if (this.field1) {
			this.toggle1 = null
		} else {
			this.toggle1 = '{{off}}'
		};
		if (this.field2) {
			this.toggle2 = null
		} else {
			this.toggle2 = '{{off}}'
		};
		if (this.field3) {
			this.toggle3 = null
		} else {
			this.toggle3 = '{{off}}'
		};
		if (this.field4) {
			this.toggle4 = null
		} else {
			this.toggle4 = '{{off}}'
		};
		if (this.field5) {
			this.toggle5 = null
		} else {
			this.toggle5 = '{{off}}'
		};
		if (this.field6) {
			this.toggle6 = null
		} else {
			this.toggle6 = '{{off}}'
		};
		if (this.field7) {
			this.toggle7 = null
		} else {
			this.toggle7 = '{{off}}'
		};
		if (this.field8) {
			this.toggle8 = null
		} else {
			this.toggle8 = '{{off}}'
		};
		if (this.field9) {
			this.toggle9 = null
		} else {
			this.toggle9 = '{{off}}'
		};
		if (this.field10) {
			this.toggle10 = null
		} else {
			this.toggle10 = '{{off}}'
		};
		if (this.imageObject1.secure_url == null) {
			this.image1 = null
			this.toggleImage1 = '{{off}}'
		} else {
			this.image1 = this.imageObject1.secure_url
			this.toggleImage1 = null
		};
		if (this.imageObject2.secure_url == null) {
			this.image2 = null
			this.toggleImage2 = '{{off}}'
		} else {
			this.image2 = this.imageObject2.secure_url
			this.toggleImage2 = null
		};
		if (this.imageObject3.secure_url == null) {
			this.image3 = null
			this.toggleImage3 = '{{off}}'
		} else {
			this.image3 = this.imageObject3.secure_url
			this.toggleImage3 = null
		};
		if (this.imageObject4.secure_url == null) {
			this.image4 = null
			this.toggleImage4 = '{{off}}'
		} else {
			this.image4 = this.imageObject4.secure_url
			this.toggleImage4 = null
		};
		if (this.imageObject5.secure_url == null) {
			this.image5 = null
			this.toggleImage5 = '{{off}}'
		} else {
			this.image5 = this.imageObject5.secure_url
			this.toggleImage5 = null
		};
		var errmessage = 'Ai! Het item is niet opgeslagen.';
		var errSet = new Set();
		// Maximum character validation
		if (_.size(this.field1) > this.maxchars) {
			errSet.add('1')
		};
		if (_.size(this.field2) > this.maxchars) {
			errSet.add('2')
		};
		if (_.size(this.field3) > this.maxchars) {
			errSet.add('3')
		};
		if (_.size(this.field4) > this.maxchars) {
			errSet.add('4')
		};
		if (_.size(this.field5) > this.maxchars) {
			errSet.add('5')
		};
		if (_.size(this.field6) > this.maxchars) {
			errSet.add('6')
		};
		if (_.size(this.field7) > this.maxchars) {
			errSet.add('7')
		};
		if (_.size(this.field8) > this.maxchars) {
			errSet.add('8')
		};
		if (_.size(this.field9) > this.maxchars) {
			errSet.add('9')
		};
		if (_.size(this.field10) > this.maxchars) {
			errSet.add('10')
		};
		var errArray = Array.from(errSet);
		if (_.size(errArray) == 1) {
			err = new Error(errmessage +' Regel '+errArray+' is te lang. Er passen slechts '+this.maxchars+' tekens in een regel.');
			next(err);
		} else if (_.size(errArray) > 1) {
			err = new Error(errmessage +' Regels '+_.join(_.initial(errArray),', ')+' en '+_.last(errArray)+' zijn te lang. Er passen slechts '+this.maxchars+' tekens in een regel.');
			next(err);
		};
		// Promote item to ready
		if (this.ReadyToRender == true ) {
				this.renderStatus = 'ready'
				this.ReadyToRender = false
		};
		next();
});

// How to render the table in de admin UI
PaintbotItem.defaultColumns = 'output, createdAt|25%, author|15%, renderStatus|15%';

PaintbotItem.register();
