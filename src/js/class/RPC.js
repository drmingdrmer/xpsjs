var t = window.RPC = function(scb,fcb){
	this.successCB = scb || $util.voidFunc;
	this.failCB = fcb || $util.voidFunc;
}

net.xp.util.Debuggable.mixTo(t);
net.xp.net.XHR.mixTo(t);
net.xp.util.InstanceStatusManager.mixTo(t);

var p = {
	call : function (url,params, postParams){
		var option = {};
		if (postParams != null){
			option.method = "POST";
			option.header={"Content-Type" : "application/x-www-form-urlencoded"}
			var data = [];
			for (var i in postParams){
				data[data.length] = encodeURI(i)+"="+encodeURI(postParams[i]);
			}
			option.data = data.join("&");
		}
		this.load($util.urlParam(url,params),option);
	},
	
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
		
	
	
		
		var xml = xhr.responseXML;
		if (xml == null) throw new Error ("parsing xml failed");
		
		var r = xml.documentElement;
		if (r == null) throw new Error ("xml contains no root node");
		
	
		
		r = $n.$(r);
		if (r.$.success == null) throw new Error ("illegal result format");
		if (r.$.success == "1") {
			this.successCB(r.$.name, r.result);
		} else {
		
			this.failCB(r.error);
		}
	},
	
	//override from XHR.
	fail : function (xhr){
		this.alertD("fail");
		this.statusInc("fail");
	
		this.failCB();
		
		//this.failCB(this,xhr);
	}
}


$util.cpAttr(t.prototype,p,true);