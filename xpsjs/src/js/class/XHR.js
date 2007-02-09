var t = window.XHR = function(scb,fcb){
	this.successCB = scb || $util.voidFunc;
	this.failCB = fcb || $util.voidFunc;
}

net.xp.util.Debuggable.mixTo(t);
net.xp.net.XHR.mixTo(t);
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
		this.alertD("sucess");
		this.statusInc("success");
		this.successCB(this,xhr);
	},
	
	//override from XHR.
	fail : function (xhr){
		this.alertD("fail");
		this.statusInc("fail");
		this.failCB(this,xhr);
	}
}


$util.cpAttr(t.prototype,p,true);