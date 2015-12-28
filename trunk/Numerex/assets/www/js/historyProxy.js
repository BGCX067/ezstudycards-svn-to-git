function loadHistory(){
		$.mobile.showPageLoadingMsg();	
		var postData = {"auth_token":getAuthTokenFromUrl(),"page":1};
		 $.ajax({
	        type: "GET",
	        url: EVENTS_URL,
	        contentType: "application/json; charset=utf-8",
	        data: JSON.stringify(postData),
	        dataType: "json",
	        success: LoadHistorySucceeded,
	        error: LoadHistoryFailed
	    });	
	}
	
	function LoadHistorySucceeded(result) {		
		createList(result);
		$.mobile.hidePageLoadingMsg();
	}
	
	function LoadHistoryFailed(result) {
	    alert("Problem connecting to the server. Please retry.");
	    $.mobile.hidePageLoadingMsg();
	}
	
	function createList(result)	{
		var eventList="";
		//alert(result[0].event.description);	
		
		$.each(result, function(i, item) {
			eventList += "<li>";
			eventList += "<h3>" + item.event.description + "</h3>";
			//var d = new Date(item.event.created_at);
			var formattedDate = returnCSTFormatDate(item.event.created_at);
			
			eventList += "<p>" + formattedDate + "</p>";
			eventList += "<hr/>";
			eventList += "</li>"; 
		});
		
		$("#listEvents").html(eventList);
	}
	
	function returnCSTFormatDate(gmtFormatDateString) {
		var dateString = gmtFormatDateString;
		var date = dateString.substring(8,10);
		var month = dateString.substring(5,7);
		var year = dateString.substring(0,4);
		var hours = dateString.substring(11,13);
		var min = dateString.substring(14,16);
		var sec = dateString.substring(17,19);
		var dt = new Date(year, month, date, hours, min, sec);
		month = dt.getMonth()-1;
		dt.setMonth(month);
		var milli = 300 * 60 * 1000;
		var newDate = new Date(dt.getTime() - milli);
		var ap = "AM";
		var hour = newDate.getHours();
		if (hour   > 11) { ap = "PM";        }
		if (hour   > 12) { newDate.setHours(hour - 12); }
		if (hour   == 0) { newDate.setHours(12); }
		return newDate.toString().substring(0,21) + " " + ap + " CST";
	}