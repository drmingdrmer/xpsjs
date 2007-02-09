
var t = window.Properties = function(callback){
	this.callback = callback || $util.voidFunc;
	
}

net.xp.net.XHR.mixTo(t);
net.xp.str.Properties.mixTo(t);
net.xp.util.Debuggable.mixTo(t);
net.xp.util.InstanceStatusManager.mixTo(t);

var p = {
	
	//override from XHR.
	onStart : function (url){
		this.statusInc("active");
		this.statusInc("load");
	},
	
	//override from XHR.
	finish : function (xhr){
		this.statusDec("active");
	},
	
	
	//override from XHR.
	success : function (xhr){
	
		this.statusInc("success");
		this.parseProperties(xhr.responseText);
		this.callback(this);
	},
	
	//override from XHR.
	fail : function (xhr){
	
		this.statusInc("fail");
	}
	
	
	
}


$util.cpAttr(t.prototype,p,true);