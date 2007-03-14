new Module("net.xp.util.Wrapper",
[
    "net.xp.core.Core"
],function ($this,$name){return {
	createWrapFunction : function (obj, proName, funcName) {
	},

	set : function (value){
		this._set($name, "wrapped", value);
	},

	get : function (){
		return this._get($name, "wrapped");
	}
}});