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
	apiKey: { type: Types.Key, label: 'API key', initial: false, noedit: true}
});


Key.schema.pre('save', function(next) {
    if (this.apiKey == null ) {
        this.apiKey = randomize('Aa0', 64);
    }
		next();
});



/**
 * Registration
 */
Key.defaultColumns = 'name, apiKey';
Key.register();
