/**
 * supply a way to get this-object & module relatived object.
 * Module need to store values in it should mix this Module. 
 * TODO make Module variables access more efficient.
 */
new Module("net.xp.core.ModuleUtil", [
  ],function ($this, $name){

  
return {
  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     Get the object store module-relative variables in this-object.
   * @param {String} name
   * @return {Object}
   */
  _ : function (name) {
    name = name || arguments.callee.caller.getModName();/* TODO how to fix browsers without 'caller' support */
    if (this.$getModuleVar == null){
      this.$getModuleVar = Module.createGetFunc({});
    }
    var mVar = this.$getModuleVar();
    mVar[name] = mVar[name] || {};
    return mVar[name];
  },

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     Get Module variable
   * @param {String} varName      The variable name to get.
   * @param {Object} defaultValue Default value.
   * @return {Object} variable value
   */
  _get : function (varName, defaultValue) {
    var m = this._(arguments.callee.caller.getModName());
    m[varName] = m[varName] != null ? m[varName] : defaultValue;
    return m[varName];
  },

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     Set Module variables
   * @param {String} varName variable name
   * @param {Object} value the value to set
   * @return {Object} The value set to this variable
   */
  _set : function (varName, value) {
    var m = this._(arguments.callee.caller.getModName());
    m[varName] = value;
    return value;
  },

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     Get Global variable of Module.
   * @return {Object} Global Module variable
   */
  __ : function (name) {
    name = name || arguments.callee.caller.getModName();
    Module[name] = Module[name] || {};
    return Module[name];
  },




  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     test if target object has all methods this Module has.
   * @param {Object} obj the object to compare
   * @return {Boolean} 
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
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *    create a New instance contains all this Module's methods
   * @param {Object} obj
   *    obj could be one of 3 type of data : constructor function, properties
   *    hash, default constructor's parameters.
   * @return {Object} create new OO instance.
   */
  newInst : function (obj) {
    if (obj && obj.concat){             // treat as construct parameters
      var clazz = this.clz();

      // A hack to create new instance with specific params.
      // For no apply method of new.
      var dele = function (){};
      dele.prototype = clazz.prototype;
      var inst = new dele();            // invoke pseudo constructor
      clazz.apply(inst,obj);            // invoke real constructor.
      return inst;

    } else {
      var clazz = this.clz(obj);
      return new clazz();
    }
  },

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *    Create a class with prototype mixed with this module.
   * @param {Object} obj 
   *    Could be constructor function or properties hash.
   * @return {Function} Class constructor
   * 
   * TODO cache the same class with same parameter.
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

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *    get Module by name
   * @return {Module} 
   */
  $M : function (name){
    var m = this._get("modHistory", {});

    //get from cache
    var mod = m[name];
    if (mod) return mod;

    //get from normal way
    mod = Module.get(name);
    if (mod != null) {
      m[name] = mod;
      return mod;
    }

    //take some fucking guess
    var reg = new RegExp("[^\\s]*" + name, "g");
    var n = Module.initedMdouleStr.match(reg);

    if (n == null) throw new Error("cant find module with name : "+name);
    if (n.length > 1) throw new Error("more than one modules with the name : " + name);

    mod = Module.get(n[0]);
    m[name] = mod;
    return mod;
  },

  /**
   * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
   * @description
   *     Mix with another Module.
   * @param {String} name Module name
   * @return {Module} This Module
   */
  mix : function (name){
    this.$M(name).mixTo(this);
    return this;
  }


}});
