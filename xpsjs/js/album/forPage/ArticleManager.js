/**
* @param as is element used to display album item
* @param url is url to load albums
* @param mode define how to render albums list
*/
var x = window.ArticleManager = function (url, render, listener){
	this.url = url;
	this.render = render;
	
	this.data = null;
	//album collection referenced by name.
	this.pics = {};
	this.selection = {};
	
	if (listener!=null){
		this.addEventListener("onload",listener);
		//this.addEventListener("onload",listener);
	}
}
net.xp.event.EventDispatcher.mixTo(x);
var p = {
	
	setUrl : function (url){
		this.url = url || this.url;
		if (this.url == null) throw new Error("no url specified");
	},
	
	getUrl : function (){
		if (this.url == null) throw new Error("no url specified");
		return this.url;
	},
	
	isPicExist : function (id){
		return this.pics[id] != null;
	},
	
	load : function (){
		var thiz = this;
		new XHR(	function(x,xhr){thiz.ev_success(xhr);},
					function(x,xhr){thiz.ev_fail(xhr);}).load(this.url);
	},
	
	ev_success : function (xhr){
		
		var d = this.data = $n.$(xhr.responseXML.documentElement, false);
		this.pics = {};
		this.selection = {};
		var as = d.articleAlbums.articleAlbum || [];
		as = (as instanceof Array) ? as : [as];
		var l=as.length;		
		for (var i=0;i<l; i++) this.pics[as[i].$.vid] = as[i];
	
		this.render.render(as);
		this.dispatchEvent({type:"onload",data:d});
	},
	
	ev_fail : function (xhr){		
		
	}
}
$util.cpAttr(x.prototype, p, true);