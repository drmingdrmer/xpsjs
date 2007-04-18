
var alertCache = "";
var $Debug = true;
function $(id){
	return document.getElementById(id);
}
function $A(a){
	var ar =[];
	for (var i=0; i<a.length; i++) ar.push(a[i]);
	return ar;
}
window.al = window.alert;
window.alert = function (){
	var e = $("debug");

	var s = $A(arguments).join("\n") + "\n";
	if (e == null) alertCache += s;
	else {
		e.innerHTML +=alertCache+s;
		alertCache =""
	}
}