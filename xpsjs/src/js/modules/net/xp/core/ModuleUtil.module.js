/**
 * supply a way to get this-object & module relatived object.
 * Module need to store values in it should mix this Module. 
 */
new Module("net.xp.core.ModuleUtil",
[
],function ($this, $name){

	
return {


	_ : function (name) {
		if (this.$getModuleVar == null){
			this.$getModuleVar = Module.createGetFunc({});
		}
		var mVar = this.$getModuleVar();
		mVar[name] = mVar[name] || {};
		return mVar[name];
	},

	_get : function (name, varName, defaultValue) {
		var m = this._(name);
		m[varName] = m[varName] != null ? m[varName] : defaultValue;
		return m[varName];
	},

	_set : function (name, varName, value) {
		var m = this._(name);
		m[varName] = value;
		return value;
	},

	__ : function (name) {
		Module[name] = Module[name] || {};
		return Module[name];
	},




	/**
	 * test if target object has all methods this Module has.
	 */
	compatableTo : function (obj) {
		if (this.constructor != Module) throw new Error("this is not a Module Instance");
		if (obj == null) return false;
		if (typeof(obj) == "function") obj = obj.prototype;
		for (var i in this) {
			if (this[i].isModMethod && this[i].getModule() == this && Module.prototype[i] == null ) {
				if (typeof(obj[i]) != "function") {
					return false;
				}
			}
		}
		return true;
	},

	/**
	 * create a New instance contains all this Module's methods
	 * @param {Object} obj
	 * 		obj could be one of 3 type of data : constructor function, properties hash, default constructor's parameters.
	 */
	newInst : function (obj) {
		if (obj instanceof Array){//treat as construct parameters
			var clazz = this.clz();

			//a hack to create new instance with specific params
			var dele = function (){};
			dele.prototype = clazz.prototype;
			var inst = new dele();//invoke pseudo constructor
			clazz.apply(inst,obj);// invoke real constructor.
			return inst;

		} else {
			var clazz = this.clz(obj);
			return new clazz();
		}
	},


	/**
	 * create a class with all methods of this Module.
	 * @param {Object} obj could be constructor function or properties hash.
	 */
	clz : function (obj) {
		obj = obj || this.$Constructor;
		var constr;
		if (typeof(obj) == "object") {
			constr = function () {
				for (var i in obj) this[i] = obj[i];
			}
		} else constr = obj;

		this.mixTo(constr);
		return constr;
	},

	$M : function (name){
		var m = this._get($name, "modHistory", {});

		var mod = m[name];
		if (mod) return mod;

		mod = Module.get(name);
		if (mod != null) {
			m[name] = mod;
			return mod;
		}

		var reg = new RegExp("[^\\s]*" + name, "g");
		var n = this._externModuleStr.match(reg);

		if (n == null) throw new Error("cant find module with name : "+name);
		if (n.length > 1) throw new Error("more than one modules with the name : " + name);

		mod = Module.get(n[0]);
		m[name] = mod;
		return mod;
	}

}});