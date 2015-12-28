// check for new status every 10 sec
window.setInterval(checkPanelStatus, 10000);

// function to check the panel status
function checkPanelStatus(){
	var auth_token = Get(AUTH_TOKEN_KEY);
	
	var postData = {"auth_token":auth_token};
		$.ajax({
	        type: "GET",
	        url: CURRENT_STATUS_URL,
	        contentType: "application/json; charset=utf-8",
	        data: postData,
	        dataType: "json",
	        success: LoadStatusSucceeded,
	        error: LoadStatusFailed
	    });	    	
}

function LoadStatusSucceeded(result) {
	 	var status = result.status;
    	NotifyIfDifferentStatus(status);    	
	}
	
function LoadStatusFailed(result) {
	}

function NotifyIfDifferentStatus(newStatus){
		var oldStatus = Get(STATUS_KEY);		
		if(oldStatus != undefined && oldStatus != newStatus){			
			window.plugins.statusBarNotification.notify("Numerex", "Your panel has been " + newStatus);
			
			// if loadStatus function is present ie. if on panel page then refresh
			if(typeof LoadPanelStatus == 'function')
				LoadPanelStatus();
			
			// if loadHistory functin is present ie. if use is on history page then refresh the page
			if(typeof loadHistory == 'function')
				loadHistory();
			}			
			 
		Save(STATUS_KEY, newStatus);	 		
	}