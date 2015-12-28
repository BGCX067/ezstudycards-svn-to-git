function loadAccountInfo(){
		$.mobile.showPageLoadingMsg();
		var auth_token = getAuthTokenFromUrl();
		var postData = {"auth_token":auth_token};
		 $.ajax({
	        type: "GET",
	        url: ACCOUNT_URL,
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(postData),
	        dataType: "json",
	        success: LoadAccountSucceeded,
	        error: LoadAccountFailed
	    });	
	}
	
function LoadAccountSucceeded(result) {
	SetValues(result);
	$.mobile.hidePageLoadingMsg();
}
	
function LoadAccountFailed(result) {
	alert("Problem connecting to the server. Please retry.");
	$.mobile.hidePageLoadingMsg();
}

function SetValues(result){
	$("#trackingNum").text(result[1].alarm_panel.tracking_number);
	$("#unitName").text(result[1].alarm_panel.name);
	$("#unitSerialNum").text(result[1].alarm_panel.serial_number);
		
	$("#customerName").text(result[0].account.company);
	$("#address").text(getFormattedAddress(result));
	$("#phone").text(result[0].account.phone);
	$("#email").text(result[0].account.email);
	$("#timezone").text(result[0].account.time_zone);
}

function getFormattedAddress(result){
	var add = result[0].account.address;
	add += "\n\r" + result[0].account.address_2;
	add += "\n\r" + result[0].account.city + " " + result[0].account.state + " " + result[0].account.zip
	return add;
}