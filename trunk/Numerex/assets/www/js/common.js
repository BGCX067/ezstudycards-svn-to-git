var auth_token;

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);


function redirect(page) {
	getAuthTokenFromUrl();
	window.location.href = page + "?auth=" + auth_token;
}

function getAuthTokenFromUrl(){
	var query = window.location.search.substring(1);
	//alert(query);
	auth_token = query.split("=")[1];
	return auth_token;
}

function Save(key, value){
	window.localStorage.setItem(key, value);
}

function Get(key){
	return window.localStorage.getItem(key);
}


// PhoneGap is ready
//
function onDeviceReady() {
    // Empty        
}

// Log out 

function logOutUser(){
       $.mobile.showPageLoadingMsg();
       var postData = {"auth_token":auth_token};
              $.ajax({
               type: "GET",
               url: SIGN_OUT_URL,
               contentType: "application/json; charset=utf-8",
               data: JSON.stringify(postData),         
               dataType: "json",
               success: LogOutSucceeded,
               error: LogOutFailed
           });
}
 
function LogOutSucceeded() {
       window.location.href="login.html";
}
 
function LogOutFailed(){
       alert("Log Out Failed!");
}