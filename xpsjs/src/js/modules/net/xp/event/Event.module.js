Module.require([
	"net.xp.event.EventDispatcher"
]);


new Module("net.xp.event.Event",
[
    "net.xp.core.*",
	"net.xp.browser.BrowserDetect"
],function ($this, $name){return {
	$initialize : function (){
	},

	listen : function (o,name,listener,p){
		if (o.nodeType != null && o.attachEvent){
			o.attachEvent("on"+name,listener,p);
		} else {
			o = $E(o);
			o.addEventListener(name, listener, p);
		}
	},

	stop : function (o, name, listener) {
		if (o.nodeType != null && o.detachEvent){
			o.detachEvent("on"+name,listener);
		} else {
			o = $E(o);
			o.removeEventListener(name, listener);
		}
	},

	cancel : function (e) {
		if (this.is("IE")) {
			e.returnValue = false;
			e.cancelBubble = true;
		} else
			e.preventDefault();
	}
}});