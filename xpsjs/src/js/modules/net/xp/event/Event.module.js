Module.require([
	"net.xp.event.EventDispatcher"
]);


new Module("net.xp.event.Event",
[
    "net.xp.core.Core"
],function ($this, $name){return {
	_$initialize : function (){
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
	}
}});