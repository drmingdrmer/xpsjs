new Module("net.xp.util.array.Wrapper",
[
    "net.xp.core.Core",
	"net.xp.util.array.Array"
],function ($this,$name){return {
	
	_$defaultConstructor : function (arr){
		this._set($name, "array", arr);
	},

	$A : function (a){
		var w = $this.newInst([this.toArray(a)]);
	},

	get : function (){
		return this._get($name, "array");
	},

	getEnumArray : function (){
		return this.get();
	},







	join : function () {
		var m = this._($name);
		return m.array.join.apply(m.array, arguments);
	},

	concat : function () {
		var m = this._($name);
		return m.array.concat.apply(m.array, arguments);
	},

	push : function () {
		var m = this._($name);
		return m.array.push.apply(m.array, arguments);
	},

	pop : function () {
		var m = this._($name);
		return m.array.pop.apply(m.array, arguments);
	},

	reverse : function () {
		var m = this._($name);
		return m.array.reverse.apply(m.array, arguments);
	},

	shift : function () {
		var m = this._($name);
		return m.array.shift.apply(m.array, arguments);
	},

	slice : function () {
		var m = this._($name);
		return m.array.slice.apply(m.array, arguments);
	},

	sort : function () {
		var m = this._($name);
		return m.array.sort.apply(m.array, arguments);
	},

	splice : function () {
		var m = this._($name);
		return m.array.splice.apply(m.array, arguments);
	},

	unshift : function () {
		var m = this._($name);
		return m.array.unshift.apply(m.array, arguments);
	}



}});