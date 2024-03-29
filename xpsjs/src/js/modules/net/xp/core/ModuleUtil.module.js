/**-------------------------/// Most used module methods \\\---------------------------
 *
 * <b></b>
 * @version : 1.0
 * @since : 2007 10 16 21:57:05
 * 
 * @description :
 *    Supply a way to get this-object & module relatived object.  Module need
 *    to store values in it should mix this Module. 
 * @usage : 
 * 
 * @author : drdr.xp | drdr.xp@gmail.com
 * @copyright  
 * 
 *--------------------------\\\ Most used module methods ///---------------------------*/
new Module("net.xp.core.ModuleUtil", [
  ],function ($t, $n, $p, $g){
    var h;
    return h = {

      toString : function (){
	return "Mod[" + $n + "] ";
      }, 

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
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
       * @author : drdr.xp | drdr.xp@gmail.com
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
	  clazz.apply(inst, obj);            // invoke real constructor.
	  return inst;

	} else {
	  var clazz = this.clz(obj);
	  return new clazz();
	}
      },

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *    Create a class with prototype mixed with this module.
       * @param {Object} obj 
       *    Could be constructor function or properties hash.
       * @return {Function} Class constructor
       * 
       * TODO cache the same class with same parameter.
       */
      clz : function (obj) {
	obj = obj || this.$constructor;
	var constr;
	var thiz = this;
	if (typeof(obj) == "object") {
	  /* TODO there may be a bug that creating object by this class after obj already changed */
	  constr = function () {
	    for (var i in obj) this[i] = obj[i];
	    Module.initVar(this, thiz);
	  }
	} else {
	  constr = function (){
	    var t = obj.apply(this, arguments);
	    if (t == null || typeof(t) != "object") 
	      t = this;
	    Module.initVar(this, thiz);
	    return t;
	  };
	}
	

	this.mixTo(constr);
	return constr;
      },

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *    get Module by name
       *
       *    rule : 
       *      $M can only be called from Module methods
       *
       *
       *
       * @return {Module} 
       */
      $M : function (name){

	var modFrom;
	if (this.constructor == Module)
	  modFrom = this;
	else 
	  modFrom= h.$M.caller.module;

	var m = (modFrom.modHistory = modFrom.modHistory || {});

	//get from cache
	var mod = m[name];
	if (mod) return mod;


	if ('.' == name.charAt(0)) {			/* partial path or name only */

	  mod = Module.get(modFrom._reqModTable[name]);	/* try to get module as name */

	  if (null == mod) {				/* partial path */
	    
	    //take some fucking guess
	    var reg = new RegExp("[^\\s]*" + name, "g");
	    var n = modFrom._reqModStr.match(reg) || [];

	    if (n.length > 1) throw new Error("more than one modules with the name : " + name);
	    /* if (n == null) throw new Error("cant find module with name : "+name); */

	    mod = Module.get(n[0]);
	  }

	} else {		    /* treat as full path */
	  mod = Module.get(name);
	}

	mod && (m[name] = mod);
	return mod;
      },

      /**
       * @author : drdr.xp | yanbo@staff.sina.com.cn | drdr.xp@gmail.com
       * @description
       *     Mix module to normal object. and initialize module-relative
       *     variables
       * @param {Object} o any object
       * @return {Module} current module
       */
      mix2o : function (o){
	if (!o) return this;
	if (this.constructor != Module) 
	  throw new Error("mix2o can be call from only module");

	this.copyTo(o);
	Module.initVar(o, this);

	return this;
      }, 

      /**
       * @author : drdr.xp | drdr.xp@gmail.com
       * @description
       *     Mix with another Module.
       * @param {String} name Module name
       * @return {Module} This Module
       */
      mix : function (name){
	if (!name) return this;

	if (name.constructor == Module)
	  name.mixTo(this);
	else 
	  this.$M(name).mixTo(this);
	return this;
      }


    }});
