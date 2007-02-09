var x = new Module("net.xp.dom.WindowRelative",
[
	"net.xp.core.ModuleVars"
],{
	_$initialize : function (){
		this.setDefaultWorkingWin(Module.getHostWin());
		
	},
	
	setDefaultWorkingWin : function (win){
		var g = this.$g(arguments);
		g.win = win;
	},
	
	setWorkingWin : function (win){
		var m = this.$m(arguments);
		m.win = win;
	},
	
	getWorkingWin : function (){
		return this.$m(arguments).win || this.$g(arguments).win;
	},
	
	$Win : function (win){
		return win || this.getWorkingWin();
	},
	
	$WDoc : function (win){
		return this.$Win(win).document;
	},
	
	setDomain : function (){
		
	},
	
	getDomain : function (){
		
	}
	
});