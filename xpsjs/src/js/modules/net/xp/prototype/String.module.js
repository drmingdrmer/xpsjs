Module.require([
	"net.xp.prototype.Array"
]);
new Module("net.xp.prototype.String",
[
	"net.xp.core.*"
], function ($this, $name) { return {
	$initialize : function () {
		window.$S = $this.$S;
		$this.mixTo(String);

	},

	$Alias : function (){
		Module.getHostWin().$S = $this.$S;
	},

	$Mix : function (win){
		$this.mixTo(win.String);
	},

	$S : function (str){
		return new String(str);
	},

	getEnumArray : function ($overridable){
		return this.split("");
	},

	trim : function () {
		return this.trimTail().trimHead();
	},

	trimHead : function () {
		return this.replace(/^(\u3000|\s|\t)*/gi, "");
	},

	trimTail : function () {
		return this.replace(/(\u3000|\s|\t)*$/gi, "");
	},

	low : String.prototype.toLowerCase,
	
	up : String.prototype.toUpperCase,

	

	stripTags: function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	},

	stripScripts: function() {
		var str = this.replace(/<script([^>]*?)\/>/img, "<script$1><\/script>");
		var sr = /(<script[^>]*?>)((1|[^1])*?)(<\/script>)/gmi;
		return str.replace(sr, '');
	},

	extractScripts : function () {
		var str = this.replace(/<script([^>]*?)\/>/img, "<script$1><\/script>");
		var sr = /(<script[^>]*?>)((1|[^1])*?)(<\/script>)/gmi;
		var scripts = [];
		str.replace(sr, function (rs, s1, s2, s3) {
			scripts.push(s2);
		});

		return scripts;
	},

	evalScripts : function (win){
		win = win || Module.getHostWin();
		win.eval(this.extractScripts().join(";"));
	},

	toQueryParams: function() {
		var match = this.trim().match(/([^?#]*)(#.*)?$/);
		if (!match) return {};

		var query = match[1];
		var o = {};
		query.replace(/([^&=]*)\=([^&]*)/gim,function (w,n,v){
			var value = v.j2o() || v;
			if (o[n]){
				if (o[n].concat) o[n].push(value);
				else o[n] = [o[n],value];
			} else o[n] = value;
		});
		return o;
	},


	toInt : function (h){
		return parseInt(this,h);
	},

	toArray : function (bits){
		return this.match(new RegExp("[\\u0000-\\uffff]{1," + (bits || 1) + "}", "gm"));
	},

	getAll : function (reg){
		reg.global = true;
		return this.match(reg);
	},

	a2u : function (){
		return this.replace(/\\u([\da-f]{4})/gi, function (a, b) {
			return String.fromCharCode(b.toInt(16));
		});
	},

	j2o : function (){
		try{
			return eval("("+this+")");
		} catch (e){}
		return null;
	},




	//TODO simplify shorten
	//util for wide characters manipulation

	expand : function (){
		var r= this.replace(/([\u00ff-\ufffe])/gi,"\uffff$1");
		return r;
	},

	collapse : function (){
		return this.replace(/\uffff/gi,"");
	},
	
	shorten : function (len, suffix){
		suffix = suffix || "..";
		return this.expand().substr(0,len).collapse() + suffix;
	},


	escapeHTML: function() {
		var div = document.createElement('div');
		var text = document.createTextNode(this);
		div.appendChild(text);
		return div.innerHTML;
	},

	unescapeHTML: function() {
		var div = document.createElement('div');
		div.innerHTML = this.stripTags();
		if (div.childNodes[0]){
			if (div.childNodes.length > 1){
				var memo = "";
				$A(div.childNodes).each(function(node){memo+=node.nodeValue});
				return memo;
			} else return div.childNodes[0].nodeValue;
		} else return "";
	},

	equals : function (o){
		return this.toString() == o.toString();
	}
}});