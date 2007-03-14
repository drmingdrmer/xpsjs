new Module("net.xp.util.array.Wrapper",
[
		"net.xp.core.Core",
		"net.xp.util.array.Array",
		"net.xp.util.Wrapper"
],function ($this,$name){return {

	_$defaultConstructor : function (arr){
		this.set(arr);
	},

	$A : function (a){
		var w = $this.newInst([this.toArray(a)]);
	},

	getEnumArray : function (){
		return this.get();
	},







	join : function () {
		var o = this.get();
		return o.join.apply(o, arguments);
	},

	concat : function () {
		var o = this.get();
		return o.concat.apply(o, arguments);
	},

	push : function () {
		var o = this.get();
		return o.push.apply(o, arguments);
	},

	pop : function () {
		var o = this.get();
		return o.pop.apply(o, arguments);
	},

	reverse : function () {
		var o = this.get();
		return o.reverse.apply(o, arguments);
	},

	shift : function () {
		var o = this.get();
		return o.shift.apply(o, arguments);
	},

	slice : function () {
		var o = this.get();
		return o.slice.apply(o, arguments);
	},

	sort : function () {
		var o = this.get();
		return o.sort.apply(o, arguments);
	},

	splice : function () {
		var o = this.get();
		return o.splice.apply(o, arguments);
	},

	unshift : function () {
		var o = this.get();
		return o.unshift.apply(o, arguments);
	}



}});