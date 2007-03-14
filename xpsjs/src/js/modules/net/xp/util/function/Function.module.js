Module.require([
	"net.xp.util.array.Array"
]);

new Module("net.xp.util.function.Function",
[
    "net.xp.core.Core"
],function ($this,$name){return {

	_$initialize : function (){
		window.$GF = $this.$GF;
		$this.mixTo(Function.prototype);
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
		time = time == null ? 10 : time;
		window.setTimeout(this,time);
	},

	$GF : function (value){
		return function (){return value};
	},

}});