new Module("net.xp.dom.WindowRelative",
[
	"net.xp.Core"
],function ($this, $name){
return {
	$initialize : function (){
		this.setDefaultWorkingWin(Module.getHostWin());
		
	},
	
	setDefaultWorkingWin : function (win){
		var g = this.__($name);
		g.win = win;
	},
	
	setWorkingWin : function (win){
		var m = this._($name);
		m.win = win;
	},
	
	getWorkingWin : function (){
		return this._($name).win || this.__($name).win;
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