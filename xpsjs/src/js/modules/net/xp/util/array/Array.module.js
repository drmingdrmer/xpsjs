new Module("net.xp.util.array.Array",
[
    "net.xp.core.*"
],function ($this,$name){return {
	$initialize : function (){
		window.$A = $this.toArray;
		$this.mixTo(Array);

		if (Module.doAlias) $this.$Alias();
	},

	$Alias : function (){
		Module.getHostWin().$A = window.$A;
	},
	
	$A : function (o){
		return $this.toArray(o);
	},
	
	toArray : function (o){
		if (o == null) return null;
		var ar = [];
		if (o.length == null) {
			for (var i in o)
				if (typeof o[i] != "function") ar.push(o[i]);
		}
		else {
			if (o.concat) return [].concat(o);
			
			for (var j = 0; j < o.length; j++) {
				ar.push(o[j]);
			}
		}
		return ar;
	},

	getEnumArray : function (){
		return this;//return this Array when mixed to Array
	}
}});