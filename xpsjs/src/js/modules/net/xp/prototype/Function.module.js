Module.require([
	"net.xp.prototype.Array",
	"net.xp.event.Event"
]);

new Module("net.xp.prototype.Function",
[
    "net.xp.core.*"
],function ($this, $name){
	function EV(){
		return Module.get("net.xp.event.Event");
	}

return {

	$initialize : function (){
		window.$GF = $this.$GF;
		window.$F = $this.$F;
		window.$Break = {};
		
		$this.mixTo(Function);
	},
	
	$Alias : function (){
		var win = Module.getHostWin();
		win.$GF = window.$GF;
		win.$F = window.$F;
	},

	$F : function (f) {
		if (f.constructor.prototype == Function.prototype || f.bind == $this.bind)
			return f;
		$this.copyTo(f);
		return f;
	},

	$GF : function (value){
		return function (){return value};
	},

	when : function (o, evName){
		EV().listen(o, evName, this);
	},

	as : function (o,name){
		o[name] = this;
	},

	bind : function (obj){
		var args = $A(arguments);
		args.shift();
		var func = this;
		return function() {
			//TODO concat arguments or $A(arguments)
			return func.apply(obj, args.concat(arguments));
		};
	},

	asListener : function (o){
		var func = this;
		return function (e){
			return func.apply(o, [e || window.event]);
		}
	},

	delay : function (time){
		time = time || 10;
		var func = this;
		return function (){
			window.setTimeout(func, time);
		}
	},

	combine : function (/* function.. */){
		var funcArray = $A(arguments).unshift(this);
		var r = function (){
			var args = arguments;
			var rslt = [];
			for (var i=0; i<funcArray.length; ++i){
				var t = f.apply(this,args);
				rslt.push(t);
				if (t == $Break) return rslt;
			}
			return rslt;
		}
		r.funcArray = funcArray;
		return r;
	},

	after : function (o,name){
		if (o[name] == null){
			o[name] = this;
		} else if (o[name].funcArray){
			o[name].funcArray.push(this);
		} else {
			var f = o[name];
			o[name] = this.combine();
			o[name].funcArray.unshift(f);					/* no bind for the returned function executes in o-this */
		}
		return o[name];	
	},
	
	before : function (o,name){
		if (o[name] == null){
			o[name] = this;
		} else if (o[name].funcArray){
			o[name].funcArray.unshift(this);
		} else {
			var f = o[name];
			o[name] = this.combine();
			o[name].funcArray.push(f);						/* no bind for the returned function executes in o-this */
		}
		return o[name];	
	},

	aroundBy : function (o, name){
		var r = o[name].bind(o, this);
		return r;
	},

	times : function (n){
		for (var i=0;i<n;i++){
			this();
		}
	},

	asCall : function () {
		var func = this, args = arguments;
		return function (t) {
			return func.apply(t, args);
		}
	}

	


}});
