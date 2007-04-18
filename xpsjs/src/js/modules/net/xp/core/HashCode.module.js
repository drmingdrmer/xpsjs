var x = new Module("net.xp.core.HashCode",
[
	"net.xp.core.ModuleUtil"
],function ($this,$name){ return {
	$initialize : function (){
		var g = $this.__();
		g.hash = 1;
	},

	hashCode : function (){
		this._$getHashCode = this._$getHashCode || this._createHashFunc();
		return this._$getHashCode();
	},

	_createHashFunc : function (){
		var curCode = this._generateHashCode();
		return function (){return curCode;};
	},

	_generateHashCode : function (){
		var g = this.__();
		return g.hash++;
	}
}});