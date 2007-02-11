/**
 * supply a way to get this-object & module relatived object.
 * Module need to store values in it should mix this Module. 
 */
new Module("net.xp.core.ModuleVars",[],{
	_ : function (name){
		this[name] = this[name] || {};
		return this[name];
	},

	$m : function (arg){
		var name = arg.callee.getModule()._name;
		var pr = this.constructor.prototype;
		var isProto = this == pr;
		
		pr[name] = (pr[name] || (function (){}).prototype);
		if (this[name] == pr[name] && !isProto)
			this[name] = new pr[name].constructor();
		
		if (isProto) return pr[name];
		else return this[name];
	},

	__ : function (name){
		var _$g = (Module[name] = (Module[name] || {}));
		return _$g;
	},
	
	$g : function (arg){
		var name = arg.callee.getModule()._name;
		var _$g = (Module[name] = (Module[name] || {}));
		return _$g;
	},
	
	$gv : function (arg, name){
		return this.$g(arg)[name];
	},
	
	$sv : function (arg, name, value){
		this.$g(arg)[name] = value;
	}
})