var keystone = require('keystone'),
    _ = require('lodash'),
 		Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Template = new keystone.List('Template');

Template.add({
	// User input
	name: { type: Types.Text, label: 'Naam', required: true, index: true, hidden: true  },
	selectfields: { type: Types.Select, label: 'Aantal tekstvelden', initial: false, default: '0', options: '0,1,2,3,4,5,6,7,8,9,10'},
  max: { type: Types.Text, label: 'Max. aantal karakters per veld', initial: false, default: '0'},
	selectimages: { type: Types.Select, label: 'Aantal Afbeeldingen', initial: false, default: '0', options: '0,1,2,3,4,5'},
  },'Instructies',{
  instructions: { label: 'Instructies', type: Types.Textarea, initial: false, height: 200 },
  example: { label: 'Voorbeeld', type: Types.CloudinaryImage, initial: false, autoCleanup : true, folder: 'TemplatesV1', publicID: 'output'},
},'After Effects',{
  rendersettings: { label: 'Render Settings', type: Types.Select, initial: false, default: 'Avid DNxHD alpha', options: [
    'Avid DNxHD alpha',
    'Avid DNxHD no alpha'
  ]}
});


Template.schema.pre('save', function(next) {
  if ( _.size(this.instructions) <= 104 ) {
    this.instructions = 'Deze template heeft '+this.selectfields+' tekstvelden en '+this.selectimages+' afbeeldingen. Het maximaal aantal karakters per tekstveld is '+this.max+'.'
  };
  this.nameAF = _.kebabCase(this.name);
  next();
});


/**
 * Registration
 */
Template.defaultColumns = 'name, renderSettings';
Template.register();
