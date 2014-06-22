 Ext.define('pos.view.Display' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.logindisplay',
	header : true,
	border : true,
	bodyBorder : true,
    title : 'Users',
    
    initComponent: function() {
        this.store = 'Users',
 
        this.columns = [
            {header: 'id',  dataIndex: 'id'},
            {header: 'name',  dataIndex: 'name'}
        ];
   
        this.callParent(arguments);
    }
});