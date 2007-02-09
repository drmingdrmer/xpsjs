var x = window.FileItemManager = function(fl, pva, init, mx) {
	
	this.listHolder = fl;
	this.previewArea = pva;
	
	this.curFileNum = 0;
	this.initAmount = init;
	this.maxAmount = mx;
}
var p = {
	setMax : function (m){
		return;
		m = (m == null || m <0) ? 0 : m;
		if (m>10) m=10;
		this.maxAmount = this.initAmount = m;
		if (this.initAmount > 5) this.initAmount = 5;
		this.createFileInputs();
		this.refreshPreview();
	},
	
	isValidFile : function (i){
		var fipt = $util.$$("..li_"+i+"..fileContent", this.listHolder);
		return this.isValidUrl(fipt.value);
	},
	
	isValidUrl : function (url){
		return url != null && $str.trim(url) != "";
	},
	
	getNextValidFile : function (i){
		i = parseInt(i || 0);
		var l = this.listHolder;
		for (++i;i<this.curFileNum;i++){
			var form = $util.$$("..li_"+i+"..form", l);
			var inp = $util.$$("..fileContent", form);
			var addr = $str.trim(inp.value).replace(/\\/g,"/");
			if (addr != ""){
				return {
						form 	: form, 
						index	: i,
						name	: this.getFileNameFromUrl(addr)
				};
			}
		}
	},
	
	getValidFileAmount : function (){
		var l = this.curFileNum, count=0;
		for (var i=0; i<l; i++) {
			var fipt = $util.$$("..li_"+i+"..fileContent", this.listHolder);
			if ($str.trim(fipt.value) != "") 
				count++;
		}
		return count;
	},
	
	
	
	
	createFileInputs : function (){		
		this.listHolder.innerHTML = "";
		this.curFileNum = 0;
		for (var i=0; i<this.initAmount; i++) this.createFileInput();
	},
	
	/**
	* file input operation.
	*/
	createFileInput : function (){
		var idx = this.curFileNum++;
		var e = this.createFileInputElement(idx);
		
		this.listHolder.appendChild(e);
	},
	
	createFileInputElement : function(idx){
		var i = idx + 1;
		var html = 	'<li id="li_'+idx+'">'
						+'<form id="form" method="POST" enctype="multipart/form-data">'
							+'<input id="fileContent" type="file" size="50" class="picFile" name="fileContent" value="" onfocus=""/>'
							+'<span id="message" style="display:none;color:#d00;"> 出错</span>'
							+'<input id="fileKey" type="hidden" name="fileKey" value="'+i+'" />'
							+'<input id="title" type="hidden" name="pic_title_'+i+'" />'
						+'</form>'
					+'</li>';
		var e = $util.nodeFromHtml(html);

		var ipt = $util.$$("..fileContent",e);
		ipt.manager = this;
		ipt.index = idx;
		
		var thiz = this;
		$util.addEL(ipt,"focus", function (e){thiz.ev_onfileFocus.apply(ipt,[e||window.event]);},true);
		$util.addEL(ipt,"blur", function (e){thiz.ev_onfileBlur.apply(ipt,[e||window.event]);},true);
		
		
		return e;
	},
	
	showError : function (idx, t){
		t = t == null ? true : t;
		var li = $util.$$("..li_"+idx, this.listHolder);
		$util.$$("..message",li).style.display = t ? "" : "none";
	},
	
	clearFile : function (idx){
		var li = $util.$$("..li_"+idx, this.listHolder);
		
		var e = this.createFileInputElement(idx);
		this.listHolder.insertBefore(e,li);
		this.listHolder.removeChild(li);
	},
	
	
	removeLastFileInput : function (){
		var cnt = this.listHolder;
		var e = cnt.lastChild;
		cnt.removeChild(e);
	},

	getFileNameFromUrl : function (url){
		return url.replace(/\\/g,"/").replace(/^(.*?)\/([^\/]*)$/,"$2");
	},
	
	createPreviewElm : function (url){
		var valid = this.isValidUrl(url);
		url = !valid ? "images/invalid.gif" : url;
		var e, h;
		var name = this.getFileNameFromUrl(url);
		if (!valid){
			h='<div class="prev"><img src="images/invalid.gif"/></div>';
		} else if ($util.$IE && !$util.$IE7){
			h='<img src="'+url+'" class="prev" alt="'+name+'" />';
		} else {
			h='<div class="prev"><span class="text">'+name+'</span></div>';
			//h='<div class="prev"><img src="images/invalid.gif"/></div>';
		}
		return $util.nodeFromHtml(h);
	},
	
	/**
	* create a preview item (img or div)
	*/
	createPreviewForFileInput : function(idx){
		var l = this.listHolder;
		var f = $util.$$("..li_"+idx+"..fileContent",l);
		var url = f.value;
		var e = this.createPreviewElm(url);
		e.id =idx;
		this.previewArea.appendChild(e);
	},
	
	refreshPreview : function(){
		this.clearPreview();
		var l = this.curFileNum;
		for (var i=0; i<l; i++){
			this.createPreviewForFileInput(i);
		}
	},
	
	clearPreview : function (){
		this.previewArea.innerHTML = "";
	},
	
	/**
	* file input events
	*/
	ev_onfileFocus : function(e){		
		if (this.index < this.manager.maxAmount-1 && this.index == this.manager.curFileNum-1){
			this.manager.createFileInput();
		}
	},
	ev_onfileBlur : function(e){		
		this.manager.refreshPreview();
	}
	
	
	
}

$util.cpAttr(x.prototype,p);