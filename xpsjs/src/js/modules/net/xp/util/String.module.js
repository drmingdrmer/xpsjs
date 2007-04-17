Module.require([
	"net.xp.util.Array"
]);
new Module("net.xp.util.String",
[
	"net.xp.core.*"
], function ($this, $name) { return {
	$initialize : function () {
		var g = this.__($name);
		g.substr = function (start, len) {
			if (this[start] == "\01") start--;
			var end = start + len ;
			if (this[end] == "\01") end--;
			return this.slice(start, end).join("").replace(/\01/gi, "");
		};

		window.$S = $this.$S;
		$this.mixTo(String);
	},

	$S : function (str){
		return new String(str);
	},

	strip: function() {
		return this.replace(/^\s+/, '').replace(/\s+$/, '');
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
		var scriptElement = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
		return this.replace(new RegExp(scriptElement, 'img'), '');
	},

	extractScripts: function() {
		//TODO Why match all then match one?
		var scriptElement = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
		var matchAll = new RegExp(scriptElement, 'img');
		var matchOne = new RegExp(scriptElement, 'im');
		return (this.match(matchAll) || []).map(function(scriptTag) {
			return (scriptTag.match(matchOne) || ['', ''])[1];
		});
	},

	extractScripts_xp : function () {
		var sr = /(<script[^>]*?>)((1|[^1])*?)(<\/script>)/gmi;
		var scripts = [];
		this.replace(sr, function (rs, s1, s2, s3) {
			scripts.push(s2 + ";");
		});

		return scripts;
	},

	evalScripts : function (){
		eval(this.extractScripts_xp().join());
	},

	toQueryParams: function(separator) {
		var match = this.strip().match(/([^?#]*)(#.*)?$/);
		if (!match) return {};

		return match[1].split(separator || '&').inject({}, function(hash, pair) {
			if ((pair = pair.split('='))[0]) {
				var name = decodeURIComponent(pair[0]);
				var value = pair[1] ? decodeURIComponent(pair[1]) : undefined;

				if (hash[name] !== undefined) {
					if (hash[name].constructor != Array)
						hash[name] = [hash[name]];
					if (value) hash[name].push(value);
				}
				else hash[name] = value;
			}
			return hash;
		});
	},



	toInt : function (h){
		return parseInt(this,h);
	},

	toArray : function (bits){
		return this.match(new RegExp("[\\u0000-\\uffff]{" + (bits || 1) + "}", "gm"));
	},

	a2u : function (){
		return this.replace(/\\u([\dabcdefABCDEF]{4})/gi,function (a,b){
			return String.fromCharCode(b.toInt(16));
		});
	},

	




	//TODO simplify shorten
	//util for wide characters manipulation
	getStrWrap : function (str,charset){		
		var ar = str.replace(/([\u00ff-\uffff])/gi,"$1\01").split("");
		ar.$substr = this.$g(arguments).substr;
		return ar;
	},
	
	shorten : function (str,len, suffix){
		suffix = suffix || "..";
		var aln = this.getStrWrap(str), al = aln.length;
		if (al > len) str = aln.$substr(0,len) + suffix;
		return str;
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
}});