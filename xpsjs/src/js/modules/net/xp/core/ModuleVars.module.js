/**
 * supply a way to get this-object & module relatived object.
 * Module need to store values in it should mix this Module. 
 */
new Module("net.xp.core.ModuleVars",
[
],function ($this, $name){return {


	_ : function (name) {
		this[name] = this[name] || {};
		return this[name];
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
		return (Module[name] = (Module[name] || {}));
	}

}});