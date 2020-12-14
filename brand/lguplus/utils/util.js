/**
 * 
 */
var isMobile = {
	   Android: function () {
	       return navigator.userAgent.match(/Android/i) ? true : false;
	   },
	   BlackBerry: function () {
	       return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	   },
	   iOS: function () {
	       return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	   },
	   Windows: function () {
	       return navigator.userAgent.match(/IEMobile/i) ? true : false;
	   },
	   any: function () {
	       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS());
	   }
	};

function ajaxPost(url,data,callback){
	data = JSON.stringify(data);
	$.ajax({
	    type: "POST",
	    dataType : "json",
	    contentType : "application/json",
	    data : data,
	    url: url,
	    success:callback,
	    error : function(e) {
	      alert(e.responseJSON.error);
	    }
	});
}

function ajaxHtmlPost(url,data,callback){
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		dataType : "html",
		contentType : "application/json",
		data : data,
		url: url,
		success:callback,
		error : function(e) {
			alert(e.responseJSON.error);
		}
	});
}

function ajaxGet(url,data,callback){
	data = JSON.stringify(data);
	$.ajax({
	    type: "GET",
	    dataType : "json",
	    contentType : "application/json",
	    data : data,
	    url: url,
	    success:callback,
	    error : function(e) {
	    	alert(e.responseJSON.error);
	    }
	});
}

function ajaxPut(url,data,callback){
	data = JSON.stringify(data);
	$.ajax({
	    type: "PUT",
	    dataType : "json",
	    contentType : "application/json",
	    data : data,
	    url: url,
	    success:callback,
	    error : function(e) {
	    	alert(e.responseJSON.error);
	    }
	});
}

function ajaxDelete(url,data,callback){
	data = JSON.stringify(data);
	$.ajax({
	    type: "DELETE",
	    //define returning data format 
	    //dataType : "json",
	    contentType : "application/json",
	    data:data,
	    url: url,
	    success:callback,
	    error : function(e) {
	    	alert(e.responseJSON.error);
	    }
	});
}