Module.require([
	"net.xp.util.Array",
	"net.xp.event.Event"
]);

new Module("net.xp.util.Function",
[
    "net.xp.core.*"
],function ($this, $name){
	function EV(){
		return Module.get("net.xp.event.Event");
	}

return {

	$initialize : function (){
		window.$GF = $this.$GF;

		window.$F = function (f){
			if (f.constructor.prototype == Function.prototype || f.bind == $this.bind) return f;
			$this.copyTo(f);
			return f;
		}
		$this.mixTo(Function);

		if (Module.doAlias) $this.$Alias();
	},

	$Alias : function (){
		var win = Module.getHostWin();
		win.$GF = window.$GF;
		win.$F = window.$F;
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

	combine : function (){
		var funcArray = $A(arguments).unshift(this);
		var r = function (){
			var args = arguments;
			funcArray.each(function (f){
				f.apply(this,args);
			});
		}
		r.funcArray = funcArray;
		return r;
	},

	append : function (o,name){
		if (o[name] == null){
			o[name] = this.combine();
		} else if (o[name].funcArray){
			o[name].funcArray.push(this);
		} else {
			var f = o[name];
			o[name] = this.combine();
			o[name].funcArray.unshift(f);
		}
			
	},

	times : function (n){
		for (var i=0;i<n;i++){
			this();
		}
	},

	asCall : function () {
		var func = this, args = $A(arguments);
		return function (t) {
			return func.apply(t, args);
		}
	},

	
	$GF : function (value){
		return function (){return value};
	}

}});