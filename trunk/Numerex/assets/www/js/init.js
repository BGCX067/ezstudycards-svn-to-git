$(document).ready(function(){
		   	checkAuthTokenStatus();	   	
		});
	
// function to check if logged in auth token is still valid
// if valid then redirect to status page
function checkAuthTokenStatus(){
	var auth_token = Get(AUTH_TOKEN_KEY);
	var postData = {"auth_token":auth_token};
		$.ajax({	       
	        type: "GET",
	        url: CURRENT_STATUS_URL,
	        contentType: "application/json; charset=utf-8",
	        data: postData,
	        dataType: "json",
	        success: checkSuccess, 
	        error: checkFailed
	    });	
}

function checkSuccess(result) {
		if(result.type == "success"){
			window.location.href="security.html?auth="+Get(AUTH_TOKEN_KEY);		
		}    		
		else
			window.location.href="login.html";
	}
	
function checkFailed(result) {
			window.location.href="login.html";
	}