new Module("net.xp.util.object.Object",
[
    "net.xp.Core"
],function ($this,$name){return {
	$initialize : function (){
		window.$Get = $this.get;
	},

	get : function (name){
		return this[name];
	}

}});