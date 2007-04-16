new Module("net.xp.util.object.Hash",
[
    "net.xp.core.*"
],function ($this,$name){return {
	$initialize : function (){
		window.$H = function (o){
			return $this.copyTo(o);
		}
	},



	keys : function (){
		return this.pluck("key");
	},

	values : function (){
		return this.pluck("value");
	},

	entries : function (){
		return this.all();
	},

	getEnumArray : function ($overridable){
		var ar = [];
		for (var i in this) {
			if (this.constructor.prototype[i] == null && typeof(this[i]) != "function")
				ar.push({key : i, value:this[i]});
		}
		return ar;
	}
}});