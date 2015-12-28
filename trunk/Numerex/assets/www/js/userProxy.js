// call webservice for authentication
function loginUser(){	
		var username = $("#username").val();
		var password = $("#password").val();
		var postData = {"user":{"email":username, "password":password}};
		 $.ajax({
		 	beforeSend: function() { $.mobile.showPageLoadingMsg();},
			complete: function() { $.mobile.hidePageLoadingMsg();},	       
	        type: "POST",
	        url: SIGN_IN_URL,
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(postData),	        
	        dataType: "json",
	        success: AjaxSucceeded,
	        error: AjaxFailed
	    });
}

function AjaxSucceeded(result) {
 	var auth_token = result.auth_token;
 	Save(AUTH_TOKEN_KEY, auth_token);
 	window.location.href="security.html?auth="+auth_token; 	
}

function AjaxFailed(result) {
    alert("Invalid username, and password. Please retry.");
	//alert(result.error);
    $.mobile.hidePageLoadingMsg();
}

// Exit

function Exit() {
	navigator.app.exitApp();
}