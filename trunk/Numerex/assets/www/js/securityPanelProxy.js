// load status at page load
$(document).ready(function(){
	   	LoadPanelStatus();	   	
});	

// load the current status of the panel
function LoadPanelStatus(){		
		var postData = {"auth_token":Get(AUTH_TOKEN_KEY)};		
		$.ajax({
			beforeSend: function() { $.mobile.showPageLoadingMsg();},
			complete: function() { $.mobile.hidePageLoadingMsg();},
	        type: "GET",
	        url: CURRENT_STATUS_URL,
	        contentType: "application/json; charset=utf-8",
	        data: postData,
	        dataType: "json",
	        success: LoadPanelSucceeded,
	        error: LoadPanelFailed
	    });	    
	}
	
	function LoadPanelSucceeded(result) {
	 	var status = result.status;
	 	if( status == "armed"){
			$("#ArmPanel").attr("class", "visible");
			$("#DisarmPanel").attr("class", "hidden");
		}	 	
		else{
			$("#ArmPanel").attr("class", "hidden");
			$("#DisarmPanel").attr("class", "visible");
		}				
    	PanelNotify(status);
    	Save(STATUS_KEY, status);
	}
	
	function LoadPanelFailed(result) {
	    alert("Problem connecting to the server. Please retry.");	    
	}
	
	function PanelNotify(newStatus){
		var oldStatus = Get(STATUS_KEY);
		if(oldStatus != undefined && oldStatus != newStatus)
			alert("The security panel has been " + newStatus);
	}
	
	function ArmIt(IsArm){
		var postData = {"auth_token":Get(AUTH_TOKEN_KEY)};
		var url = ARM_URL;
		if(IsArm == false) // if disarm
			url = DISARM_URL							
		 $.ajax({
	        beforeSend: function() { $.mobile.showPageLoadingMsg();},
			complete: function() { $.mobile.hidePageLoadingMsg();},	       
	        type: "POST",
	        url: url,
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(postData),
	        dataType: "json",
	        success: ArmSucceeded,
	        error: ArmFailed
	    });	
	}
	
	function ArmSucceeded(result){
		LoadStatus();
	}
	
	function ArmFailed(result){
		alert("There was a problem sending command.");
	}

	