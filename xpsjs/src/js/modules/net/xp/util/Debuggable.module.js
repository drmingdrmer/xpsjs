new Module("net.xp.util.Debuggable",
  [
    "net.xp.core.ModuleVars",
    "net.xp.dom.DocRelative",
    "net.xp.dom.select.$"
  ],function ($this,$name){
    //private members
    var $prv = {
      getLogArea : function (doc){
	doc = this.$Doc(doc);
	var id = "_$debugArea";
	var t = this.$(id, doc);
	if (!t && doc.body) {
	  t = this.$ce("div", doc, {
	      id		: id
	    });
	  t.style.cssText = "border:1px solid #000; width:100%;";
	  doc.body.appendChild(t);
	}
	return t;
      },

      getConvertTextarea : function (doc) {
	doc = this.$Doc(doc);
	var id = "_$debugUtil";
	var t = this.$(id, doc);
	if (!t && doc.body) {
	  t = this.$ce("textarea", doc, {
	      id		: id
	    });
	  t.style.cssText = "display:none";
	  doc.body.appendChild(t);
	}
	return t;
      }
    };


    return {
      $initialize : function (){
	this.setDefaultDebugMode(true);
	this.$g().indent = "";
      },

      isDebug : function () {
	return this._().debuggable || this.$g().debuggable;
      },

      setDebug : function (t) {
	this._().debuggable = t == true;
      },

      setAllInstancetDebugMode : function (t) {
	this.constructor.prototype._($name).debuggable = t == true;
      },

      setDefaultDebugMode : function (t){
	var g = this.$g();
	g.debuggable = t == true;
      },

      convertHtml : function (s) {
	var t = $prv.getConvertTextarea.apply(this);
	if (t) {
	  try {
	    t.innerHTML = s;
	    return t.innerHTML;
	  }
	  catch (e) {
	    return s;
	  }
	} else return s;
      },



      log : function (s, type){
	if (!this.isDebug()) return;

	type = type || "#000";
	var c = $prv.getLogArea.apply(this);
	var e = this.$ce("div",null,{
	    innerHTML : this.$g().indent + this.convertHtml(s)
	  });
	e.style.cssText = "white-space:pre; border-bottom:1px solid #ddd; background-color:"+type+";";
	c.appendChild(e);
      },



      indentAdd : function (){
	this.$g().indent +="	";
      },

      indentDec : function (){
	var g = this.$g();
	g.indent = g.indent.substr(1);
      },

      logTrace : function (s) {
	this.print(s, "#fff");
      },

      logStep : function (s) {
	this.print(s, "#efe");
      },

      logDebug : function (s) {
	this.print(s, "#def");
      },

      logWarn : function (s) {
	this.print(s, "#ffa");
      },

      logError : function (s) {
	this.print(s, "#fdd");
      }
    };
  });
