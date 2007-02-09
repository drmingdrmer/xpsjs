var t = window.Shortcut = function(listener){
	this.listener = listener;
	
	this.initKeyBind(document,500);
}

net.xp.util.Debuggable.mixTo(t);
net.xp.event.KeyBind.mixTo(t);

var p = {
	add : function (key,name){
		this.bindKey([key],name);
		this.addEventListener(name,this.listener);
	}
	

}


$util.cpAttr(t.prototype,p,true);