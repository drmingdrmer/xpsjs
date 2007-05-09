new Module("net.xp.prototype.Array",
[
    "net.xp.core.*"
],function ($this,$name){return {
	$initialize : function (){
		window.$A = $this.toArray;
		$this.mixTo(Array);

	},

	$Alias : function (){
		Module.getHostWin().$A = window.$A;
	},

	$A : function (o){
		return $this.toArray(o);
	},

	toArray : function (o){
		if (o == null) return null;
		var ar = [];
		if (o.length == null) {
			for (var i in o)
				if (typeof o[i] != "function") ar.push(o[i]);
		}
		else {
			if (o.concat) return [].concat(o);

			for (var j = 0; j < o.length; j++) {
				ar.push(o[j]);
			}
		}
		return ar;
	},

	getEnumArray : function (){
		return this;//return this Array when mixed to Array
	},


	/**
	* make browser pack for unpresented method
	*/

	pop : function ($overridable){
		var r = this[this.length-1];
		--this.length;
		return r;
		
	},

	push : function ($overridable){
		for (var i=0; i<arguments.length; ++i){
			this[this.length] = arguments[i];
		}
		return i;
	},

	slice : function (i,n,$overridable){
		var ar = [];
		for (var a=i; a<n; ++a){
			ar[ar.length] = this[a];
		}
		return ar;
	},

	splice : function (idx, n, $overridable) {
		n = n == null ? this.length-idx : n;
		var cache = this.slice(idx + n);
		for (var i=idx; i<n; ++i){
			this[i] = arguments[2+i-idx];
		}
		for (var i=0; i<cache.length; ++i){
			this[idx + n + i] = cache[i];
		}
		this.length = idx + n + cache.length;
		return this;
	},

	shift : function ($overridable) {
		var r = this[0];
		for (var i=1; i<this.length; ++i){
			this[i-1] = this[i];
		}
		--this.length;
		return r;
	},

	unshift : function ($overridable){
		var a = $A(arguments);
		this.splice(0, this.length, a.concat(this));
		return a.length;
	},

	indexOf : function (e,k,$overridable){
		k = k == null ? 0 : k;
		for (var i=k; i<this.length; ++i){
			if (this[i] == e) return i;
		}
		return -1;
	},

	lastIndexOf : function (e,k,$overridable){
		k = k == null ? this.length-1 : k;
		for (var i=k; i>=0; ++i){
			if (this[i] == e) return i;
		}
		return -1;
	}

	

}});