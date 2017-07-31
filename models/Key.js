var keystone = require('keystone');
var randomize = require('randomatic');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Key = new keystone.List('Key');

Key.add({
	name: { type: Types.Text, label: 'Naam', required: true, index: true, noedit: true },
	apiKey: { type: Types.Textarea, label: 'API key', height: 200, initial: false, noedit: true}
});


Key.schema.pre('save', function(next) {
    if (this.apiKey == null ) {
        this.apiKey = randomize('Aa0', 256);
    }
		next();
});



/**
 * Registration
 */
Key.defaultColumns = 'name, apiKey';
Key.register();
