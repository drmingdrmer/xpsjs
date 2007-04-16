/**
* sum
*/
new Module("net.xp.Core",
[
    "net.xp.core.ModuleUtil",
	"net.xp.core.HashCode",
	"net.xp.core.Enumerable"
],function ($this,$name){return {

	$M : function (name){
		var m = this._get($name, "modHistory", {});
		
		var mod = m[name];
		if (mod) return mod;

		mod = Module.get(name);
		if (mod != null) {
			m[name] = mod;
			return mod;
		}

		var reg = new RegExp("[^\\s]*" + name, "g");
		var n = this._externModuleStr.match(reg);
		
		if (n == null) throw new Error("cant find module with name : "+name);
		if (n.length > 1) throw new Error("more than one modules with the name : " + name);

		mod = Module.get(n[0]);
		m[name] = mod;
		return mod;
	}
}});