new Module("net.xp.util.Debuggable",
[
	"net.xp.core.ModuleVars",
	"net.xp.dom.DocRelative",
	"net.xp.util.dom.$"
],function (){
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
		_$initialize : function (){
			this.setDefaultDebugMode(true);
			this.$g(arguments).indent = "";
		},

		isDebug : function () {
			return this.$m(arguments).debuggable || this.$g(arguments).debuggable;
		},

		setDebug : function (t) {
			this.$m(arguments).debuggable = t == true;
		},

		setAllInstancetDebugMode : function (t) {
			this.constructor.prototype.$m(arguments).debuggable = t == true;
		},

		setDefaultDebugMode : function (t){
			var g = this.$g(arguments);
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
				innerHTML : this.$g(arguments).indent + this.convertHtml(s)
			});
			e.style.cssText = "white-space:pre; border-bottom:1px solid #ddd; background-color:"+type+";";
			c.appendChild(e);
		},



		indentAdd : function (){
			this.$g(arguments).indent +="	";
		},

		indentDec : function (){
			var g = this.$g(arguments);
			g.indent = g.indent.substr(1);
		},

		logTrace : function (s) {
			this.log(s, "#fff");
		},

		logStep : function (s) {
			this.log(s, "#efe");
		},

		logDebug : function (s) {
			this.log(s, "#def");
		},

		logWarn : function (s) {
			this.log(s, "#ffa");
		},

		logError : function (s) {
			this.log(s, "#fdd");
		}
	};
});