new Module("net.xp.util.function.Function",
[
    "net.xp.core.Core"
],function ($this,$name){return {

	_$initialize : function (){
		
	},
	
	_$defaultConstructor : function (func){
		this._set($name,"func",func);
	},

	createGetFunc : function (value){
		return function (){return value};
	},


	/**
	 * get a wrapper
	 */
	$F : function (func){
		return $this.newInst([func]);
	},
	
	/**
	 * return the real function.
	 */
	get : function (){
		return this._get($name,"func");
	},

	bind : function (func, obj){
		//TODO add param transmit.
		var oFunc = this._get($name, "func");
		this._set($name, "func", function() {
			oFunc.apply(obj, arguments);
		})
	}

}});