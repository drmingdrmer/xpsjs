new Module("net.xp.util.array.Array",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	_$initialize : function (){
		window.$A = $this.$A;
		$this.mixTo(Array.prototype);
	},
	
	$A : function (o){
		return this.toArray(o);
	},
	
	toArray : function (o){
		var ar = [];
		if (o.length == null) {
			for (var i in o){
				if (typeof o[i] == "function") ar.push(o[i]);
			}
		} else {
			for (var i = 0; i<o.length; i++){
				ar.push(o[i]);
			}
		}
		return ar;
	},

	getEnumArray : function (){
		return this;
	}
}});