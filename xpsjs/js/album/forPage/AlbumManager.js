/**
* @param as is element used to display album item
* @param url is url to load albums
* @param mode define how to render albums list
*/
var x = window.AlbumManager = function (as, url, mode, render, listener){
	this.albumsElement = as;
	this.url = url;
	this.mode = mode || "select";
	this.render = render;
	
	this.curId = null;
	
	this.data = null;
	//album collection referenced by name.
	this.albums = {};
	this.albumById = {};
	this.amount = 0;
	if (listener != null){
		this.addEventListener("onload",listener);
		this.addEventListener("onselect",listener);
	}
}
net.xp.event.EventDispatcher.mixTo(x);

var p = {
	
	setUrl : function (url){
		this.url = url;
	},
	
	getUrl : function (){
		return this.url;
	},
	
	select : function (id){
		this.curId = id;
		if (this.render && this.mode == "custom"){
			if (this.render.select) this.render.select(id);
		} else if (this.mode == "select"){
			var s = this.albumsElement, o = s.options, l = o.length;
			for (var i=0; i<l; i++){
				var op = o[i];
				if (op.value == id) {
					op.selected = true;
					this.dispatchEvent({type:"onselect",id:id,data:this.albumById[id]});
				}
			}
		}
	},
	
	getCurData : function (){
		return this.getDataById(this.getSelectedAlbumId());
	},
	
	getDataById : function (id){
		return this.albumById[id];
	},
	
	getSelectedAlbumId : function (){
		return this.albumsElement.value;
	},
	
	/**
	* update the 'select' element's options. according to given data.
	*/
	refreshAlbumSelect : function (o){
		if (this.albumsElement == null) {
			
			return;
		}
		var l = o.length, slt = this.albumsElement;
		slt.innerHTML = "";
		for (var i=0;i<l;i++) {
			var opt = $util.node("option",{	text 	: o[i].$.name,
											value 	: o[i].$.vid});	
			
			slt.options.add(opt);
		}
	},
	
	isAlbumExist : function (name){
		return this.albums[name] != null;
	},
	
	getPicMaxSize : function (){
		return parseInt(this.data.config.pic.maxsize.$v);
	},
	
	loadAlbum : function (){
		var thiz = this;
		new XHR(	function(x,xhr){thiz.ev_success(xhr);},
					function(x,xhr){thiz.ev_fail(xhr);}).load(this.url);
	},
	
	
	/**
	* invoke when data loading succeed.
	*/
	ev_success : function (xhr){
		
		var d = this.data = $n.$(xhr.responseXML.documentElement);	
		this.albums = {};
		this.albumById = {};
		var as = d.albums.album;
		
		if (!(as instanceof Array)) as = [as];
		
		var l = this.amount = as.length;
		
		
		for (var i=0;i<l; i++) {
			this.albums[as[i].$.name] = as[i];
			this.albumById[as[i].$.vid] = as[i];
		}
		
		switch (this.mode){
			case "select" :
				this.refreshAlbumSelect(as);
				break;
			case "custom" :
				this.render.render(as);
				break;
		}
		this.dispatchEvent({type:"onload",data:d});
	},
	
	ev_fail : function (xhr){
		//TODO alert a message
		
	}
}
$util.cpAttr(x.prototype, p, true);