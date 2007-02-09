var x = window.AlbumBrowser = function (lh){
	this.displayAmount = 5;
	this.half = 2;
	this.total = 0;
	this.position = 0;
	
	this.listHolder = lh;
	this.tables = null;
	
	this.currentId = null;
	
	this.init();
}

var p = {	
	init : function (){
		var tables = this.tables = this.listHolder.getElementsByTagName("table");
		this.position = 0;
		this.total = tables.length;
		
		
		var pre = $util.$$("gallery..movePre");
		var next = $util.$$("gallery..moveNext");

		var thiz = this;
		$util.addEL(pre, "click", function (e){thiz.preAlbum();$util.cancelEvent(e||window.event);});
		$util.addEL(next, "click", function (e){thiz.nextAlbum();$util.cancelEvent(e||window.event);});		
	},
	
	getSelectId : function (){
		return this.currentId;
	},
	
	getSelection : function (){
		return this.selection;
	},
	
	setSelection : function (id, needScroll){
		needScroll = (needScroll == true);
		this.selection = null;
		
		this.currentId = id;
		var idx = null;
		for (var i=0; i<this.total; i++){
			var tb = this.tables[i];
			tb.markElm = $util.$$("..mark", tb);
			
			if (tb.id != this.currentId){
				this.setMark(i,false);
			} else {
				this.setMark(i,true);
				idx = i;
				this.selection = tb
			}			
		}
		if (idx != null && needScroll) {
			this.scrollTo(idx);
		}
		return this.selection;
	},
	
	scrollTo : function (idx){
		if (idx >= this.total-this.half) idx = this.total-this.half-1;
		if (idx < this.half) idx = this.half;
		
		var i1 = idx-this.half, i2 = idx+this.half;
		if (i1<0) i1 = 0;
		if (i2>=this.total) i2 = this.total-1;
		
		this.position = i1;
		
		for (var i=0; i<this.total; i++){
			var t = this.tables[i];
			if (i<i1 || i>i2)
				this.hideAlbum(i);
			else 
				this.showAlbum(i);
		}
	},
	
	//fix an opera bug
	refresh : function (){
		return;
		var fr = document.getElementById("gallery");
		var r = fr.style.display;
		fr.style.display="none";
		fr.style.display=r;
	},

	setMark : function (i,f){
		this.tables[i].markElm.style.display = f ? "" : "none";
	},
	
	preAlbum : function (){
		var i = this.position, t = i > 0;
		t ? (i = --this.position, this.hideAlbum(i + this.displayAmount), this.showAlbum(i)) : null;		
		this.refresh();//fix opera bug		
	},
	nextAlbum : function (){
		var i = this.position, t = i < (this.total - this.displayAmount);
		t ? (this.hideAlbum(i), this.showAlbum(i + this.displayAmount), ++this.position) : null;
		this.refresh();//fix opera bug
	},
	
	hideAlbum : function (i){
		this.tables[i].style.display = "none";
	},
	
	showAlbum : function (i){
		this.tables[i].style.display = "";
	}
	
}

$util.cpAttr(x.prototype, p, true)