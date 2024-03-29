/**
 * 
 * @classDescription
 * Module is an object with only functions in it.
 * 
 * An module can be mixed to another object to apply some certain functions to
 * the object.
 *
 * Module are designed to be mixed to Function(class), in which case it is
 * actually mixed to its prototype.
 *
 * In regular case, methods of Module should not be override by other Modules,
 * except one case: that a method of module with the last parameter named of
 * '$overridable'. This is a mark.
 * 
 * @version 0.2
 *
 * 
 * @param {String} name Module name, separated by dot(".")
 * @param {Array} modules Modules this module required.
 * @param {Object} hash function hash.usually an object.
 *
 * @TODO simplify Module access.
 * @TODO simplify module properties access.
 * @TODO how to simplify reference to other module?
 * @TODO change hash to 
 */
function Module(name, mixingMods, methods) {
  if (arguments.length < 3) {
    throw new Error("not enough parameter to create module [" + name + "], only " + arguments.length + " params");
  }

  if ("string" != typeof(name)) {
    throw new Error("name must be String but : " + name);
  }

  mixingMods = mixingMods || "";
  
  if (null != Module.get(name)) {
    alert(name + " has aready been used");
    throw new Error(name + " Module already existed");
    return false;
  }

  if (mixingMods.join){
    mixingMods = mixingMods.join();
  } else if ("string" != typeof(mixingMods)) {
    throw new Error("invalid mixingMods type : " + mixingMods);
  }
  mixingMods = mixingMods.replace(/\*/g,"_All").split(",");

  if (mixingMods[0] == "") /* if no module specified */
    mixingMods = [];

  methods = methods || {};

  Module._$global[name] = {};
  /* make private properties */

  this._name = name;
  this._package = name.replace(/\.[^.]+$/, "");
  this._mixedMods = mixingMods;
  this._modsToInit = mixingMods.concat();
  this._reqMods = Module._currentRequired || []; //external Module used by this.
  this._reqModStr = " " + this._reqMods.join(" ") + " ";
  // TODO Is this needed?
  this._reqModTable = {}; // Name to full name map;
  for (var i= 0; i < this._reqMods.length; ++i){
    var e = this._reqMods[i];
    var nm = e.match(/\.(\w+)$/)[0];
    this._reqModTable[nm] = this._reqModTable[nm] || e;
  }
  Module._currentRequired = null;


  /* TODO test me $r, $c for moduleRoot & current package */
  /* provider provides function hashes. */
  if (typeof(methods) == 'function')
    methods = methods(
      this,                       /* current module               */
      this._name,                 /* current module name          */
      this._package,              /* current package              */
      Module._$global[name],      /* global module storage object */
      Module.moduleRoot,          /* module root                  */
      Module.get(this._package)); /* cuurent package obj          */

  for (var i in methods) {
    if ('function' == typeof(methods[i])) {
      this[i] = Module.makeModMethod(this, methods[i], i);
    }
  }

  Module.assignName(name, this);
  Module.queueInitJob(name, this);
  Module.tryToInit();
};

Module._$global = {};
Module.unimpl = function unimpl(){};

Module.getHostWin = function () { return Module.loader.hostWin; };
Module.getHostDoc = function () { return Module.loader.getHostDoc(); };

Module.loader = ModuleLoader ? ModuleLoader.instance : {loadModules : function (){}}; /* or empty loader */
Module.moduleRoot = window;
Module.getHostWin().Module = Module;

Module._toInitQueue = {};
Module._inited = {};
Module._initedMark = {inited : "inited"}; //Module instance initialized-mark string
Module._initedMdouleStr = " "; /* the first blank */
Module._currentRequired = null;

Module.makeModMethod = function(mod, func, name){
  if (func == Module.unimpl) {
    func = function (){
      throw new Error("unimplement method : " + mod._name + "[" + name + "]");
    }
    func.isOverridable  = Module.createGetFunc(true);
  } else {
    func.isOverridable  = Module.createGetFunc(Module.isOverridable(func));
  }
  func.getName        = Module.createGetFunc(name);
  func.getModule      = Module.createGetFunc(mod);
  func.module         = mod;
  func.getModName     = Module.createGetFunc(mod._name);
  func.modName        = mod._name;
  func.isModMethod    = true;
  return func;
}

/**
 * TODO test me
 */
Module.releaseModMethod = function(mod, name){
  var func = mod[name];
  if (func == null || !func.isModMethod) return;

  delete func.isOverridable ;
  delete func.getName       ;
  delete func.getModule     ;
  delete func.getModName    ;
  delete func.modName       ;
  delete func.isModMethod   ;
}


Module.isAlias = function (mod){ return ModuleConfig.alias[mod._name] == true; };
Module.isMix   = function (mod){ return ModuleConfig.mix[mod._name] == true; };

/* TODO test properties overriding */
Module.initVar = function (ins, modules /* or more mods */){
  var mods = arguments;
  var queue = [];
  for (var i=1; i<mods.length; ++i){
    queue.push(mods[i]);
  }

  var mod;
  while (mod = queue.shift()){
    ins[mod._name] = ins[mod._name] || {};
    queue = queue.concat(mod._mixedMods);
  }
}

/**
 * @return true if no object with the specific path
 */
Module.assignName = function (name, module) {
  if (null != Module.get(name)) 
    return false;

  var r = Module.moduleRoot;

  var ar = name
      .replace(/(^\.+)|(\.+$)/gi, "")    //remove dot before or after the whole string
      .replace(/\.+/gi, ".").split("."); //remove duplicate dot

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
  return function () { return value };
};

/**
 * used to get Module or package
 */
Module.get = function (name) {
  try {
    return eval("Module.moduleRoot." + name);
  } catch (e) {
    return undefined;
  }
};

Module.queueInitJob = function (name, module) {
  var m = Module._toInitQueue[name] = module;

  /* load only unloaded module */
  for (var i= 0; i < m._mixedMods.length; ++i){
    var mn = m._mixedMods[i];
    if (null == Module.get(mn)) {
      Module.loader.loadModule(mn);
    }
  }
};

Module.require = function (modules) {
  Module._currentRequired = modules;
  Module.loader.loadModules(modules || []);
}

Module.tryToInit = function () {
    /* console.dir(Module._toInitQueue); */

    for (var i in Module._toInitQueue) {
      try {
	Module.initModule(i);
      } catch (e) { }
    }

    /* console.dir(Module._inited); */
    /* console.dir(Module._toInitQueue); */
    /* console.log(Module._initedMdouleStr); */
};

/**
 * mix needed module to this module. runs recersively.
 */
Module.initModule = function (name, s) {
  var module = Module.get(name);
  if (module == null) throw new Error(name + " hasnt loaded yet");

  //try to mix needed module to itself.
  var md = module._modsToInit;
  for (var i = 0; i < md.length; i++) {
    if (!Module._inited[md[i]])
      Module.initModule(md[i]);

    Module.get(md[i]).mixTo(module);
    md.splice(i--,1);
  }

  /** TODO to test me */
  for (var i=0; i<module._mixedMods.length; ++i){
    module._mixedMods[i] = Module.get(module._mixedMods[i]);
  }

  try{
    module.$initialize();

    Module.alias(module);   //alias to host win
    Module.mix(module);     //mix to host win

  } catch (e) {
    alert(module._name + " : initialize error : "+e); 
  }

  Module._inited[name] = true;
  delete Module._toInitQueue[name];
  Module._initedMdouleStr += name + " ";

};

/**
* alias is a way to use module function out of module-window
*/
Module.alias = function(module, win) {
  win = win || Module.getHostWin();
  if (Module.isAlias(module))
      module.$Alias(win);
}

/**
* mix advanced prototype function to other window. using mix will polute Class prototype,but it is faster than alias.
*/
Module.mix = function(module, win){
  win = win || Module.getHostWin();
  if (Module.isMix(module))
      module.$Mix(win);
}

Module.applyAll = function (win){
  win = win || Module.getHostWin();
  var q = Module._toInitQueue;
  for (var i in q){
    if (q[i] == Module._initedMark){
      Module.alias(Module.get(i),win);
      Module.mix(Module.get(i),win);
    }
  }
}

/**
 * Module logging utils depends on other modules
 */
Module.print = function (msg, level){ };

Module.trace = function (msg){
  Module.print(msg,7);
};
Module.log = function (msg){
  Module.print(msg,7);
};
Module.debug = function (msg){
  Module.print(msg,7);
}
Module.warn = function (msg){
  Module.print(msg,7);
};
Module.error = function (msg){
  Module.print(msg,7);
};
Module.fatal = function (msg){
  Module.print(msg,7);
};


(function (proto){
  var o = {
    /**
     * @author : drdr.xp | drdr.xp@gmail.com
     * @description
     *     Initialize current Module when all required-to-mix Module loaded &
     *     initialized.
     * @return {Null}
     */
    $initialize  : function () {},
    $constructor : function () {},
    $Alias       : function (){},
    $Mix         : function (){},

    mixTo : function (t) {
      var isFunc = typeof(t) == "function";    /* mix to class constructor */
      if (!isFunc && (t.constructor != Module)){
	/* alert("illegal mix target : " + t); */
        throw new Error("Module can only be mixed to Function or Module");
      }

      if (isFunc) t = t.prototype;

      this.copyTo(t);
    },

    copyTo : function (t){
      for (var i in this) {
        if (typeof(this[i]) != "function" || Module.prototype[i] != null)
	  continue;

	/* TODO test me (overridable) */
	if (t[i] == null || (t[i].isOverridable && t[i].isOverridable())) {
          t[i] = this[i];
        }
        else if (t[i] == this[i] || this[i].isOverridable()) { /* ignore */
	  continue;
        } 
	else {
          throw new Error("memeber already exists : " + i + " in : " + (t._name || t.constructor) + " from : " + this._name);
        }
      }
      return t;
    },

    /**
     * @author : drdr.xp | drdr.xp@gmail.com
     * @description
     *     Get Global variable of Module.
     * @return {Object} Global Module variable
     * TODO Not to add properties to Module.
     */
    $g : function (name) {
      name = name || o.$g/* self */.caller.getModName();
      Module._$global[name] = Module._$global[name] || {};
      return Module._$global[name];
    }
  };

  for (var i in o) proto[i] = o[i];

})(Module.prototype);
