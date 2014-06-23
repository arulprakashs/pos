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

	
	Ext.create('Ext.form.Panel', {
        title: 'File Uploader',
        width: 400,
        bodyPadding: 10,
        frame: true,
        renderTo: 'upload-panel',    
        items: [{
            xtype: 'filefield',
            name: 'file',
            fieldLabel: 'File',
            labelWidth: 50,
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Select a File...'
        }],
 
        buttons: [{
            text: 'Upload',
            handler: function() {
                var form = this.up('form').getForm();
               
                if(form.isValid()){
                	//Ext.MessageBox.wait("Processing...", "Status");
                    form.submit({
                        url: 'importFile',
                        waitMsg: 'Uploading your file...',
                        success: function(fp, o) {
                            //Ext.Msg.alert('Success', 'Your file has been uploaded.');
                            Ext.MessageBox.hide();            	  
            	  			showMessage("Success","File upload Successfully",function(){
            	  					
            	  			});
                        }
                    });
                }
            }
        }]
    });
  	
	
 
});