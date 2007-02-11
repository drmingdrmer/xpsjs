new Module("net.xp.core.Enumerable",
[
	"net.xp.core.HashCode"
],
{

	_$initialize : function (){
		
	},

	each : function (inspector){
		if (typeof(inspector) == "function"){
			inspector = {inspect:inspector};
		}
		var ar = this.getEnumArray(), l = ar.length;
		for (var i=0; i<l; i++){
			inspector.inspect(ar[i]);
		}
	},

	getEnumArray : function ($overridable){
		var ar = [];
		for (var i in this){
			if (typeof(this[i]) != "function") ar.push(this[i]);
		}
		return ar;
	}

});