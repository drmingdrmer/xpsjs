var x = window.PageFlip = function (max, id, listener){
	this.max = max;	
	this.cur = 0;
	this.addEvents(["gotoPage","illegalPage"],listener);
	
	if (id instanceof String)
		var e = this.elm = $util.$(id);
	else 
		var e = this.elm = id;
	this.bPrev = $util.$$("..prev",e);
	this.bNext = $util.$$("..next",e);
	this.display = $util.$$("..number",e);
	this.to = $util.$$("..toPage",e);
	this.bGo = $util.$$("..go",e);
	
	this.init();
}
net.xp.event.EventDispatcher.mixTo(x);

var p = {
	init : function (){
		var thiz = this;
		$util.addEL(this.bPrev,"click",function (e){thiz.toPrev();$util.cancelEvent(e || window.event);});
		$util.addEL(this.bNext,"click",function (e){thiz.toNext();$util.cancelEvent(e || window.event);});
		$util.addEL(this.bGo,"click",function (e){thiz.goTo();$util.cancelEvent(e || window.event);});
		
		this.refresh();
	},
	
	setMax : function (n){
		this.max = parseInt(n||"0");
		this.refresh();
	},
	
	getPage : function (){
		return this.cur;
	},
	
	setPage : function (_n){
		n = parseInt(_n);
		if (isNaN(n)) throw new Error("page number is not a number : "+_n);
		if (n<1) throw new Error("page number cnt be less than 1");
		if (n>this.max && this.max > 0) throw new Error("");
		
		this.cur = n;
		this.refresh();
	},
	
	refresh : function (){
		this.bPrev.style.display = (this.cur == 1 ? "none" : "");
		this.bNext.style.display = (this.cur >= this.max ? "none" : "");
		this.display.innerHTML = "第"+this.cur+"/"+this.max+"页";
	},
	
	toPrev : function (){
		try{
			this.setPage(this.cur-1);
			var ok = true;
		}catch(e){this._error(this.cur-1);}		
		if (ok) this._go();
	},
	
	toNext : function (){
		try{
			this.setPage(this.cur+1);
			var ok = true;
		}catch(e){
			this._error(this.cur+1);
		}
		if (ok) this._go();
		
	},
	
	goTo : function (){
		var n = this.to.value;
		n = parseInt(n);
		if (isNaN(n)) 
			this._error(this.to.value);
		else {
			try{
				this.setPage(n);
				var ok = true;
			}catch(e){this._error(n);}		
			if (ok) this._go();
		}
	},
	
	_go : function (){
		this.dispatchEvent({type:"gotoPage",page:this.cur});
	},
	
	_error : function (k){
		this.dispatchEvent({type:"illegalPage",page:k});
	}
	
}

$util.cpAttr(x.prototype, p);