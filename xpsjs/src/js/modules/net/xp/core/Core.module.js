/**
* sum
*/
new Module("net.xp.core.Core",
[
    "net.xp.core.ModuleVars",
	"net.xp.core.HashCode",
	"net.xp.core.Enumerable",
	"net.xp.core.ModuleTest"
],function ($this,$name){return {
	_$initialize : function (){
		window.$M = $this.$M;
	},

	$M : function (name){
		var m = Module.get(name);
		if (m != null) return m;
		
		var reg = new RegExp("[^\\s]*" + name, "g");
		var n = this._externModuleStr.match(reg);
		
		if (n == null) throw new Error("cant find module with name : "+name);
		if (n.length > 1) throw new Error("more than one modules with the name : " + name);

		return Module.get(n[0]);
	}
}});