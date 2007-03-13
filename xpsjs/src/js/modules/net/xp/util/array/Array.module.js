new Module("net.xp.util.array.Array",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	_$initialize : function (){
	},

	toArray : function (o){
		var ar = [];
		for (var i = 0; i<o.length; i++){
			ar.push(o[i]);
		}
		return ar;
	}

	
}});