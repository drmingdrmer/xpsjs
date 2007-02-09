
var t = window.Templator = function(callback, url){
	this.callback = callback || $util.voidFunc;
	this.template = null;
	this.needCompile = true;
	
	this.script = "";
	
	if (url != null) this.load(url);
}

net.xp.util.Debuggable.mixTo(t);
net.xp.net.XHR.mixTo(t);
net.xp.util.InstanceStatusManager.mixTo(t);

var p = {
	
	setTemplateStr : function (str){
		this.template = str;
		this.setNeedRecompile();
	},
	
	_compile : function (){
		if (this.template == null){
			throw new Error("no template loaded or set");
		}
		if (!this.isNew()) return;
		
		var r = ""; // inprocess script
		var temp = this.template.replace(/\r|\n/g,"").replace(/\<\!\-\-/gmi,"\02").replace(/\-\-\>/gmi,"\03");
		temp = temp.replace(/\t/gi,"");
		
		var reg = /\02(.*?)\03|([^\02\03]*)/gmi;
		
		
		temp.replace(reg,
				function(str, a){
					if (str == "") return;
					var scr;
					if (str.indexOf("\02") == 0){
						if (a.indexOf("=") ==0){
							scr = "s+="+a.substr(1)+";\n";
						} else {
							scr = a+";\n";
						}
					} else {
						scr = "s+='"+str+"';\n";
					}
					r += scr;
			   });
		
		this.alertD("compiled scripte : \n"+r);
		this.script = r;
		this.needCompile = false;
		
	},
	
	isNew : function (){
		return this.needCompile;
	},
	
	setNeedRecompile : function (){
		this.needCompile = true;
	},
	
	getScript : function (){
		this._compile();
		return  this.script;
	},
	
	render : function (o){
		o = o || {}
		var s = "";
		var r = this.getScript();
		
		
		eval(r);
		this.alertD("render resut : \n"+s);
		return s;		
	},
	
	renderAsElement : function (o){
		var e = this._renderInTempNode(o);
		return e.firstChild;
	},
	
	renderToElement : function (o,tar){
		var e = this._renderInTempNode(o);
		var ar = e.childNodes, l = ar.length;		
		for (var i=0; i<l; l--) {			
			tar.appendChild(ar[i]);
		}
		delete e;
	},
	
	renderReplace : function (o,tar,tname,id){
		//TODO replace multi content.
		
		var prnt = tar.parentNode;
		
		
		var e = $util.tempNode();
		e.innerHTML = this.render(o);
		
		//
		var ar = e.getElementsByTagName(tname), l=ar.length;
		for (var i=0;i<l;i++){
			if (ar[i].id == id){
				this._replaceContent(ar[i],tar);
				break;
			}
		}
		if (i==l) throw new Error ("no such tag with the id.. tag : "+tname+". id : "+id);
		
		//add rendered element to doc.
		var ar = e.childNodes, l=ar.length;
		for (var i=0;i<l;i++){
			prnt.insertBefore(ar[i],tar);		
		}
			
							 
		prnt.removeChild(tar);
	},
	
	/**
	* update certain segment of this template.
	*/
	update : function (o, tar, tids, sids, opt){
		sids = sids || tids;
		opt = opt || {childOnly:true};
		var e = this.renderInTempNode(o);
		var nn = $util.$$(sids, e);
		var on = $util.$$(tids,tar);
		
		if (opt.childOnly) {
			on.innerHTML = "";
			this._replaceContent(on, nn);			
		} else {
			var prn = on.parentNode;
			prn.insertBefore(nn, on);
			prn.removeChild(on);
		}
	},
	
	_renderInTempNode : function (o){
		var e = $util.tempNode();
		e.innerHTML = this.render(o);
		return e;
	},
	
	_replaceContent : function (tar, src){
		this.alertD(src.innerHTML);
		tar.innerHTML = "";
		var ar = src.childNodes, l=ar.length;
		
		for (var i=0;i<l;l--){
			this.alertD("i="+i);
			this.alertD(ar[i]);
			this.alertD(ar[i].nodeType);
			this.alertD(ar[i].nodeName);
			
			tar.appendChild(ar[i]);
		}
		return tar;
	},
	
	_compareAndUpdate : function (o, n){
		if (o.nodeName == n.nodeName && o.nodeType == n.nodeType){
			
		} else {
		}
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
		this.setTemplateStr(xhr.responseText);
		this.callback(this);
	},
	
	//override from XHR.
	fail : function (xhr){
		this.alertD("fail");
		this.statusInc("fail");
	}
	
	
	
}


$util.cpAttr(t.prototype,p,true);