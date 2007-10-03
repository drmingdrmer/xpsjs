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
 */
window.Module = function (name, modules, hash) {
  if (modules.concat) modules = modules.join(); // array
  modules = modules.replace(/\*/g,"_All").split(",");
  if (modules[0] == "") modules = [];

  hash = hash || {};

  this._name = name;
  this._requiredModules = modules;
  this._externModule = Module.currentRequired || []; //external Module used by this.
  this._externModuleStr = " " + this._externModule.join(" ") + " ";
  Module.currentRequired = null;

  //provider provides function hashes.
  if (typeof(hash) == 'function') hash = hash(this, this._name);

  for (var i in hash) {
    this[i] = Module.makeModMethod(this, hash[i], i);
  }
  
  Module.assignModuleInstToName(name, this);
  Module.queueInitJob(name, this);
  Module.tryToInit();
};

Module.makeModMethod = function(mod, func, name){
  func.isOverridable  = Module.createGetFunc(Module.isOverridable(func));
  func.getName        = Module.createGetFunc(name);
  func.getModule      = Module.createGetFunc(mod);
  func.getModName     = Module.createGetFunc(mod._name);
  func.isModMethod    = true;
  return func;
}
Module.releaseModMethod = function(mod, name){
  var func = mod[name];
  if (func == null || !func.isModMethod) return;

  func.isOverridable = null;
  func.getName       = null;
  func.getModule     = null;
  func.getModName    = null;
  func.isModMethod   = null;
}

Module.getHostWin = function () { return Module.loader.getHostWin(); };
Module.getHostDoc = function () { return Module.loader.getHostDoc(); };

Module.isAlias = function (mod){ return ModuleConfig.alias[mod._name] == true; };
Module.isMix  =  function (mod){ return ModuleConfig.mix[mod._name] == true; };
Module.initedMark = {initedMark : "initedMark"}; //Module instance initialized-mark string
Module.loader = ModuleLoader ? ModuleLoader.instance : {loadModules : function (){}};
// Module.moduleRoot = $module;
Module.moduleRoot = window;
Module.getHostWin().Module = Module;


Module.initQueue = {};
Module.currentRequired = null;
Module.initedMdouleStr = "";

Module.assignModuleInstToName = function (name, module) {
  var r = Module.moduleRoot;
  var ar = name
      .replace(/(^\.+)|(\.+$)/gi, "") //remove dot before or after the whole string
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
  Module.currentRequired = modules;
  Module.loader.loadModules(modules || []);
}

Module.tryToInit = function () {
  try {
    for (var i in Module.initQueue) {
      if (Module.initQueue[i] != Module.initedMark)
        Module.initModule(i);
    }

    var ar = [];
    for (var i in Module.initQueue){
      if (Module.initQueue[i] == Module.initedMark) ar.push(i);
    }
    Module.initedMdouleStr = ar.join(' ');
  } catch (e) {
    //alert(e);
  }
};
/**
 * mix needed module to this module. runs recersively.
 */
Module.initModule = function (name) {
  var module = Module.get(name);
  if (module == null) throw new Error(name + " hasnt loaded yet");

  //try to mix needed module to itself.
  var md = module._requiredModules;
  for (var i = 0; i < md.length; i++) {
    if (Module.initQueue[md[i]] != Module.initedMark)
      Module.initModule(md[i]);
    Module.get(md[i]).mixTo(module);
    md.splice(i--,1);
  }
  try{
    module.$initialize();

    Module.alias(module);   //alias to host win
    Module.mix(module);     //mix to host win
  }catch (e){ alert(module._name + " : initialize error : "+e); }

  Module.initQueue[name] = Module.initedMark;
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
  var q = Module.initQueue;
  for (var i in q){
    if (q[i] == Module.initedMark){
      Module.alias(Module.get(i),win);
      Module.mix(Module.get(i),win);
    }
  }
}

/**
 * Module logging utils depends on other modules
 */
Module.print = function (msg, level){ }

Module.trace = function (msg){
  Module.print(msg,7);
}
Module.log = function (msg){
  Module.print(msg,7);
}
Module.debug = function (msg){
  Module.print(msg,7);
}
Module.warn = function (msg){
  Module.print(msg,7);
}
Module.error = function (msg){
  Module.print(msg,7);
}
Module.fatal = function (msg){
  Module.print(msg,7);
}

var o = {
  $initialize : function () {},

  $Constructor : function () {},

  $Alias : function (){},

  $Mix : function (){},
  
  mixTo : function (t) {
    //alert("mix from "+ this._name+" to "+t._name);
    var isFunc = typeof t == "function";
    if (!isFunc && (t.constructor != Module)){
      alert("illegal mix target : " + t);
      throw new Error("Module can only be mixed to Function or Module");
    }

    if (isFunc) t = t.prototype;

    this.copyTo(t);
  },

  copyTo : function (t){
    for (var i in this) {
      if (typeof(this[i]) != "function" || Module.prototype[i] != null) continue;
      if (t[i] == null)
        t[i] = this[i];
      else if (t[i] != this[i] && !this[i].isOverridable()){
        throw new Error("memeber already exists : " + i + " in : " + (t._name || t.constructor) + " from : " + this._name);
      }
    }
    return t;
  }
};

for (var i in o) Module.prototype[i] = o[i];



// Module.loader.loadJS("ModuleConfig.js");
