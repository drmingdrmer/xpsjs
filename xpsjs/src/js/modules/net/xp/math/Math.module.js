new Module("net.xp.math.Math",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	parseInt : function (v){
		v = parseInt(v);
		if (isNaN(v)) throw new Error (v + " is not an integer");
		return v;
	},

	$I : function (v){
		return this.parseInt(v);
	}
}});