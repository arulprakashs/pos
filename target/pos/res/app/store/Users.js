Ext.define('pos.store.Users', {
    extend: 'Ext.data.Store',
    model: 'pos.model.User',
	autoLoad: true,
	data : {'items':[{'id':'10','name':'Arul'}]},
	proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});