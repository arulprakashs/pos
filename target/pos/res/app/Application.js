Ext.define('pos.Application', {
    name: 'pos',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    	'Display'
    ],

    controllers: [
        'Login'
    ],

    stores: [
        // TODO: add stores here
    	'Users'
    ]
});
