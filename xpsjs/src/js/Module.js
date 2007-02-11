/**
 *
 * @classDescription
 * Module is an object with only functions in it.
 * An module can be mixed to another object to apply some certain functions to the object.
 * Module are designed to be mixed to Function(class), in which case it is actually mixed to its prototype.
 * In regular case, methods of Module should not be override by other Modules, except one case:
 * that a method of module with the last parameter named of '$overridable'.
 * This is a mark.
 * 
 * @version 0.2
 * 
 *
 * 
 * @param {String} name Module name, separated by dot(".")
 * @param {Array} modules Modules this module required.
 * @param {Object} hash function hash.usually an object.
 */
window.Module = function (name, modules, hash) {
	if (typeof(modules) == "string") modules = modules.split(",");

	this._name = name;
	this._requiredModules = modules;

	//provider provides function hashes.
	if (typeof(hash) == 'function') hash = hash(this, this._name);

	for (var i in hash) {
		this[i] = hash[i];
		this[i].isOverridable = Module.createGetFunc(Module.isOverridable(this[i]));
		this[i].getName = Module.createGetFunc(i);
		this[i].getModule = Module.createGetFunc(this);
		this[i].__$isModuleMethod = true;
	}

	Module.assignModuleInstToName(name, this);
	Module.queueInitJob(name, this);
	Module.tryToInit();
	//try to mix
};
Module.inited = "inited";
Module.loader = Loader.instance;
//noinspection JSUnresolvedVariable
Module.moduleRoot = $module;
Module.moduleRoot.Module = Module;
Module.getHostWin = function () {
	return Module.loader.getHostWin();
};
Module.getHostDoc = function () {
	return Module.loader.getHostDoc();
};
Module.initQueue = {};

Module.assignModuleInstToName = function (name, module) {
	var r = Module.moduleRoot;
	var ar = name.replace(/(^\.+)|(\.+$)/gi, "").replace(/\.+/gi, ".").split(".");
	for (var i = 0; i < ar.length - 1; i++) {
		var n = ar[i];
		r = (r[n] = r[n] || {});
	}
	r[ar[i]] = module;
};

Module.isOverridable = function (func) {
	if (func == null) return true;
	//var reg = ;
	return /^function[^\(]*?\(([^\)]*?\,)*\s*\$overridable\)/.test(func.toString());
};

Module.createGetFunc = function (value) {
	return function () {
		return value
	};
};

Module.get = function (name) {
	try {
		return eval("Module.moduleRoot." + name);
	} catch (e) {
		return null;
	}
};

Module.queueInitJob = function (name, module) {
	var m = Module.initQueue[name] = module;
	Module.loader.loadModules(m._requiredModules);
};

Module.require = function (modules) {
	Module.loader.loadModules(modules || []);
}

Module.tryToInit = function () {
	try {
		for (var i in Module.initQueue) {
			if (Module.initQueue[i] != Module.inited)
				Module.initModule(i);
		}
	} catch (e) {
		//alert(e);
	}
};
/**
 * mix needed module to this module. runs recersively.
 */
Module.initModule = function (name) {
	//alert("init:"+name);
	var module = Module.get(name);
	if (module == null) throw new Error(name + " hasnt loaded yet");

	//try to mix needed module to itself.
	var md = module._requiredModules;
	for (var i = 0; i < md.length; i++) {
		if (Module.initQueue[md[i]] != Module.inited)
			Module.initModule(md[i]);
		Module.get(md[i]).mixTo(module);
		md.splice(i--,1);
	}
	//alert("$init : "+module._name);
	try{
		module._$initialize();
	}catch (e){	alert("_$initialize error : "+e); }

	Module.initQueue[name] = Module.inited;
};

var o = {
	_$initialize : function () {
	},

	mixTo : function (t) {
		//alert("mix from "+ this._name+" to "+t._name);
		var isFunc = t instanceof Function;
		if (!isFunc && (t.constructor != Module))
			throw new Error("Module can only be mixed to Function or Module");

		if (isFunc)	t = t.prototype;

		for (var i in this) {
			if (typeof(this[i]) != "function" || Module.prototype[i] != null) continue;
			if (t[i] == null)
				t[i] = this[i];
			else if (t[i] != this[i] && !this[i].isOverridable()){
				alert("err");
				throw new Error("memeber already exists : " + i + " in : " + (t._name || t.constructor) + " from : " + this._name);

			}

		}
	},

	compatableTo : function (obj) {
		if (obj == null) return false;
		if (typeof(obj) == "function") obj = obj.prototype;
		for (var i in this) {
			if (this[i].__$isModuleMethod && Module.prototype[i] == null) {
				if (typeof(obj[i]) != "function") {
					//alert(i + ":" + obj[i]);
					return false;
				}
			}
		}
		return true;
	},

	newInst : function (constr) {
		var clazz = this.clz(constr);
		return new clazz();
	},

	clz : function (obj) {
		obj = obj || (function () {
		});
		var constr;
		if (typeof(obj) == "object") {
			constr = function () {
				for (var i in obj) this[i] = obj[i];
			}
		} else constr = obj;

		this.mixTo(constr);
		return constr;
	}
};

for (var i in o) Module.prototype[i] = o[i];