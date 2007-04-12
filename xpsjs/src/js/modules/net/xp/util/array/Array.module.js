new Module("net.xp.util.array.Array",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	_$initialize : function (){
		window.$A = $this.toArray;
		$this.mixTo(Array);
	},
	
	$A : function (o){
		return $this.toArray(o);
	},
	
	toArray : function (o){
		var ar = [], i;
		if (o.length == null)
			for (i in o)
				if (typeof o[i] == "function") ar.push(o[i]);
		else
			for (i = 0; i < o.length; i++)
				ar.push(o[i]);
		return ar;
	},

	getEnumArray : function (){
		return this;//return this Array when mixed to Array
	}
}});