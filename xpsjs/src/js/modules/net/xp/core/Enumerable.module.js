new Module("net.xp.core.Enumerable",
[
	"net.xp.core.HashCode"
],
{

	$initialize : function (){
		
	},

	each : function (inspector){
		if (typeof(inspector) == "function"){
			inspector = {inspect:inspector};
		}
		var ar = this.getEnumArray(), l = ar.length;
		var a = arguments;
		var r = [];
		if (typeof(inspector) == "string") {
			for (var i = 0; i < l; i++) {
				var e = ar[i];
				var m = eval("("+inspector+")");
				if (m != null) r.push(m);
			}
		} else {
			for (var i = 0; i < l; i++) {
				var m = inspector.inspect(ar[i],i);
				if (m != null) r.push(m);
			}
		}
		return r;
	},

	getEnumArray : function ($overridable){
		var ar = [];
		for (var i in this){
			if (this.constructor.prototype[i] == null && typeof(this[i]) != "function") ar.push(this[i]);
		}
		return ar;
	},

	inject: function(memo, iterator) {
		this.each(function(value, index) {
			memo = iterator(memo, value, index);
		});
		return memo;
	},

	findC : function (condition){
		condition = condition || "";
		return this.find("e"+condition+" ? e : null");
	},

	findAllC : function (condition){
		condition = condition || "";
		return this.findAll("e"+condition+" ? e : null");
	},

	find : function (insp){
		return this.each.apply(this,arguments)[0];
	},

	findAll : function (insp){
		return this.each.apply(this,arguments);
	},

	pluck : function (name){
		return this.each("e['" + name + "']");
	},

	all : function (){
		return this.each("e");
	}

	

});