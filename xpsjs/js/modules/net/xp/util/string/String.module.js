new Module("net.xp.util.string.String",
[
	"net.xp.core.ModuleVars"
],{
	_$initialize : function (){
		var g = this.$g(arguments);
		g.substr = function (start,len){
			if (this[start]=="\01") start--;
			var end = start + len ;
			if (this[end]=="\01") end--;
			return this.slice(start,end).join("").replace(/\01/gi,"");
		};
	},
	
	//string trim
	trim : function (str){
		return this.trimTail(this.trimHead(str));
	},
	trimHead : function (str){
		return str.replace(/^(\u3000|\s|\t)*/gi,"");
	},
	trimTail : function (str){
		return str.replace(/(\u3000|\s|\t)*$/gi,"");
	},
	
	//util for wide characters manipulation
	getStrWrap : function (str,charset){		
		var ar = str.replace(/([\u00ff-\uffff])/gi,"$1\01").split("");
		ar.$substr = this.$g(arguments).substr;
		return ar;
	},
	
	getShort : function (str,len, suffix){
		suffix = suffix || "..";
		var aln = this.getStrWrap(str), al = aln.length;
		if (al > len) str = aln.$substr(0,len) + suffix;
		return str;
	},
	
	
	//html manipulation
	escapeStr : function (str){
		var t = document.getElementById("_$convertTextarea");
		if (!t && document.body){
			var t = document.createElement("textarea");
			t.id = "_$convertTextarea";
			t.style.cssText = "display:none";
			document.body.appendChild(t);
		}
		if (t) {
			try{
				t.innerHTML = s;
				return t.innerHTML;
			}
			catch (e) {
				return s;
			}
		} else 
			return s;
	}
})