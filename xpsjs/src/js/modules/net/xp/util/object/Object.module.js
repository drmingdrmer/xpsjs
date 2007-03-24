new Module("net.xp.util.object.Object",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	_$initialize : function (){
		window.$Get = $this.get;
	},

	get : function (name){
		return this[name];
	}

}});