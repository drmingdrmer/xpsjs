Module.require([
	"net.xp.util.array.Array"
]);

new Module("net.xp.util.function.Function",
[
    "net.xp.core.Core"
],function ($this,$name){return {

	_$initialize : function (){
		window.$GF = $this.$GF;
		$this.mixTo(Function);
	},
	
	bind : function (obj){
		var args = $A(arguments);
		args.shift();
		var func = this;
		return function() {
			func.apply(obj, args.concat(arguments));
		};
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
		return function (){
			var args = $A(arguments);
			funcArray.each(function (f){
				f.apply(this,args);
			});
		}
	},

	times : function (n){
		for (var i=0;i<n;i++){
			this();
		}
	},
	
	$GF : function (value){
		return function (){return value};
	}

}});