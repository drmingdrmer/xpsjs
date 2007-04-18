new Module("net.xp.dom.WindowRelative",
[
	"net.xp.core.*"
],function ($this, $name){
return {
	$initialize : function (){
		this.setDefaultWorkingWin(Module.getHostWin());
		
	},
	
	setDefaultWorkingWin : function (win){
		var g = this.__();
		g.win = win;
	},
	
	setWorkingWin : function (win){
		var m = this._();
		m.win = win;
	},
	
	getWorkingWin : function (){
		return this._().win || this.__().win;
	},
	
	$Win : function (win){
		return win || this.getWorkingWin();
	},
	
	$Doc : function (doc){
		return doc || this.$Win().document;
	},
	
	setDomain : function (){
		
	},
	
	getDomain : function (){
		
	}
	
}});