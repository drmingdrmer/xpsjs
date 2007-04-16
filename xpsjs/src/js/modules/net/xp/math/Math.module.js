new Module("net.xp.math.Math",
[
    "net.xp.core.*"
],function ($this, $name){return {
	parseInt : function (v){
		v = parseInt(v);
		if (isNaN(v)) throw new Error (v + " is not an integer");
		return v;
	},

	$I : function (v){
		return this.parseInt(v);
	},

	max : function (a){
		var mx = a;
		for (var i=0; i<arguments.length; i++){
			if (mx <arguments[i]) mx= arguments[i];
		}
		return mx;
	}
}});