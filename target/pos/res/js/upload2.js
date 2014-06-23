var gridPanelHeight = 952;
var globalTableWidth = 933;

//MOVER_CONSOLE

//Common
var OBJ_ROOT = 'objects';
var OBJ_TOTAL = 'objectCount';
var organization = 'BC';
var rowStart = 1;
var rowLimit = 25;

var itemsPerPage = 25;

function isResponseSuccess(jsonResponse){
	
	try {
		if(typeof(jsonResponse) == 'undefined'|| jsonResponse == ''){
			return false;
		}
		
		
		var resultsObj = Ext.util.JSON.decode(jsonResponse);
		if (!resultsObj.success) {
			return false;
		}
	}catch(e){
		return false;
	}
				
	return true;

}


function getJSONErrorMessage(jsonResponse){
	
	if(typeof(jsonResponse) == 'undefined'|| jsonResponse == ''){
		return "";
	}
	
	try {
		var resultsObj = Ext.util.JSON.decode(jsonResponse);
		if (!resultsObj.success) {
		
			var message = resultsObj.message;
					
			if(typeof(resultsObj.errorDetails) !='undefined' && resultsObj.errorDetails.length > 0){
		
				for(var i=0;i<resultsObj.errorDetails.length;i++){
		  			if(i >=2){
		  				message += "<div style='font:bold;padding-left:47px;'>"+resultsObj.errorDetails[i]+"</div>";
		  			}else{
		  				message += "<div style='font:bold;'>"+resultsObj.errorDetails[i]+"</div>";
		  			}
		  		}
		  	
		  	}
		
			return message;
		}
	}catch(e){
		return jsonResponse;
	}		
	return "";

}


function showMessage(success,message,funcCallback){
	
	var title = '';
	var icon = '';
	var func = Ext.emptyFn;
	if(success == 'Success'){
		title = 'Success';
		icon = Ext.MessageBox.INFO;
	}else{
		title = 'Error';
		icon = Ext.MessageBox.ERROR;
	}
	
	if(typeof(funcCallback) != 'undefined'){
		func = funcCallback;
	}
	
	Ext.MessageBox.show({
	 		title: title,
			msg: message,
			buttons: Ext.MessageBox.OK,
			icon: icon,
			fn: func
	});
}

Ext.require('Ext.grid.Panel');
Ext.require('Ext.layout.container.Table');
Ext.require('Ext.form.Panel');
Ext.require('Ext.button.Button');
Ext.require('Ext.layout.container.Form');

Ext.onReady(function(){

	importBtn=Ext.create('Ext.Button', {
		text: 'Import File',
		minWidth: 90,
		//cls: 'bulk-delete-grid-btn-panel-item bulk-delete-grid-btn-panel-item-last',
		handler: function(btn) {
		}
	});
	
	uploadForm = Ext.create('Ext.panel.Panel', {	
		labelAlign	: 'right',
		width		: 500,
		height		: 400,
		//bodyBorder	: false,
		//border		: false,
		//hideBorders	: true,
		//buttonAlign	: 'right',
		loadMask	: {msg: 'Loading...'},
		items: [				
			Ext.create('Ext.form.Panel', {	
				id: 'bulkDeleteUploadForm',
				layout: 'table',
				cls: 'bulk-delete-grid-btn-panel',
				width: 500,
				height: 400,
				layoutConfig: {columns: 2},
				items: [
					new Ext.Component({
						autoEl	 : { html: '<form id="fileform-bulk-delete-fileupload-item"><input type="file" name="bulk-delete-fileupload-item" class="hide-browse-button" id="bulk-delete-fileupload-item"></form><div id="div-bulkupload-import-btn" class="inline-block-el"></div>' }
					})
				]		
			})
		]
	});
	
	/*uploadForm = Ext.create('Ext.panel.Panel', {
	    bodyPadding: 5,  // Don't want content to crunch against the borders
	    width: 300,
	    title: 'Filters',
	    items: [{
	        xtype: 'datefield',
	        fieldLabel: 'Start date'
	    }, {
	        xtype: 'datefield',
	        fieldLabel: 'End date'
	    }]	   
	});*/
	
	uploadForm.render('upload-panel');
	importBtn.render(Ext.get('div-bulkupload-import-btn'));	
	
	Ext.get('bulk-delete-fileupload-item').on("change", function(event, el, o) {
	  	var form = Ext.getCmp("bulkDeleteUploadForm").getForm();
	  	Ext.MessageBox.wait("Processing...", "Status");
	  	Ext.Ajax.request({
	  		url : 'importFile',
	  		method : 'GET',
	  		form : form.id,
	  		isUpload : true,
	  		callback: function(options, success, response) {
	  			Ext.MessageBox.hide();
	  			Ext.get('fileform-bulk-delete-fileupload-item').dom.reset();
	  			showMessage("Success","File upload Successfully",function(){
	  					
	  			});
	  		}
	  	});
  	});    		
  	
	
 
});