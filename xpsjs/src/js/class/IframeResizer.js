var x = window.IframeResizer = function (pw, win, callbackName){
	this.parentWindow = pw;
	this.selfWindow = win;
	this.callbackName = callbackName;
	this.scrollElement = win.document.documentElement;
	this.w0 = 0;
	this.h0 = 0;
	this.interval = {
		min : 10,
		max : 500,
		rate : 1.2,
		cur : 10
	};
	
	this.handle = null;
	
	this.addResizeEvent();
}

var p = {
	addResizeEvent : function (){
		
		
		var thiz = this;
		var foo = function (){
			var itv = thiz.interval;
			itv.cur = itv.cur * itv.rate;
			if (itv.cur > itv.max) itv.cur = itv.max;
			
			if (thiz.w0 != thiz.scrollElement.scrollWidth || thiz.h0 != thiz.scrollElement.scrollHeight){
				itv.cur = itv.min;
				thiz.w0 = thiz.scrollElement.scrollWidth;
				thiz.h0 = thiz.scrollElement.scrollHeight;
				

			}
			
			
			(thiz.parentWindow[thiz.callbackName] || function (){})();
			
			thiz.handle = thiz.selfWindow.setTimeout(foo,itv.cur);
		}
		this.handle = this.selfWindow.setTimeout(foo,this.interval.min);
		
	}
}

$util.cpAttr(x.prototype, p, true);