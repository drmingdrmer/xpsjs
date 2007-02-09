var cache = "";
window._a = window.alert;
window._alert=function(s){
	var d = document.getElementById("dbg");
	if (!d)
		cache += s+"\n";
	else {
		if (cache != "") {
			d.innerHTML = cache;
			cache = "";
		}
		d.innerHTML += "--------------------------------------------" + new Date().getTime() + s + "\n";
	}
}
window.alertTrace=function(s){
	window._alert("<div style='background-color:#fff;'>"+window.convertHtml(s)+"</div>");
}
window.alertStep=function(s){
	window._alert("<div style='background-color:#ddd;'>"+window.convertHtml(s)+"</div>");
}
window.alertDebug=function(s){
	window._alert("<div style='background-color:#dfd;'>"+window.convertHtml(s)+"</div>");
}
window.alertWarn=function(s){
	window._alert("<div style='background-color:#ff7;'>"+window.convertHtml(s)+"</div>");
}
window.alertError=function(s){
	window._alert("<div style='background-color:#fdd;'>"+window.convertHtml(s)+"</div>");
}

window.alertTemp=function(s){
	window._alert("<div style='background-color:#f99;'>"+window.convertHtml(s)+"</div>");
}

window.convertHtml = function (s){
	var t = document.getElementById("_$debugUtil");
	
	
	if (!t && document.body){
		var t = document.createElement("textarea");
		t.id = "_$debugUtil";
		t.style.cssText = "display:none";
		document.body.appendChild(t);
	}
	if (t) {
		try{
			t.innerHTML = s;
			return t.innerHTML;
		}
		catch (e) {
			return s;
		}
	} else return s;
	
}