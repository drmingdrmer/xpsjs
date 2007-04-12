Module.require([
	"net.xp.util.array.Array",
	"net.xp.event.Event"
]);

new Module("net.xp.util.function.Function",
[
    "net.xp.core.Core"
],function ($this, $name){
	function EV(){
		return Module.get("net.xp.event.Event");
	}

return {

	_$initialize : function (){
		window.$GF = $this.$GF;

		window.$F = function (f){
			return f;
		}
		$this.mixTo(Function);
		
	},

	when : function (o, evName){
		EV().listen(o, evName, this);
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