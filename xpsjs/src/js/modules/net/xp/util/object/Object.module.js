new Module("net.xp.util.object.Object",
[
    "net.xp.core.*"
],function ($this,$name){return {
	$initialize : function (){
		window.$Get = $this.get;
	},

	get : function (name){
		return this[name];
	}

}});