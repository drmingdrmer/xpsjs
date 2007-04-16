var x = new Module("net.xp.util.URL",
[
	"net.xp.Core"
],function ($this, $name){
return {
	$initialize : function (){
		this.setDefaultBase(Loader.instance.getBase());
	},
	
	getUrl : function (){
		return this._($name).url;
	},
	
	setUrl : function (url){
		this._($name).url = url;
	},
	
	parseUrlParam : function (url){
		if (url.indexOf("?") == -1) return {url:url,param:{}};
		
		var i = url.indexOf("?");
		var params = url.substr(i+1);
		var param = {};
		
		params.replace(/([%\w]*)=([%\w]*)/g,
						function (m,n,v){
							param[decodeURI(n)]=decodeURI(v);
						});
		return {url:url.substr(0,i), param:param};
	},
	
	setUrlParam : function (url,param){
		param = param || {};
		
		var o = this.parseUrlParam(url);
		url = o.url;
		$util.cpAttr(o.param, param, true);
		param = o.param;
		
		var dr = [];
		for (var i in param){
			dr[dr.length] = encodeURI(i)+"="+encodeURI(param[i]);
		}
		
		return url + "?" +dr.join("&");
	},
	
	
	
	getFullUrl : function (url){
		if (this.getBase() == null) return url;
		if (url.indexOf("/") == 0) url = this.getRootUrl()+url;
		else if (url.indexOf("://") == -1) url = this.getBase()+"/"+url;
		
		for (var l0 = url.length + 1, l1 = l0 - 1; 
			 l0 > l1; 
			 l0 = l1, l1=url.length) 
				url = url.replace(/\/[\w_]+?\/\.\.\//gi,"/");
		return url;
	},
	
	getRootUrl : function (){
		var u = this.getBase();
		u = (u.match(/^(http:\/\/[^\/]*?)\//) || [])[1];
	
		return u || "";
	},
	
	getDomain : function (){
		var u = this.getBase();
		u = (u.match(/^http:\/\/([^\/]*?)\//) || [])[1];
	
		return u || "";
	},
	
	getBase : function (){
		return this.$m(arguments).base || this.getDefaultBase();
	},
	
	setBase : function (base){
		this.$m(arguments).base = base;
	},
	
	getDefaultBase : function (base){
		this.$g(arguments).base = base;
	},
	
	setDefaultBase : function (base){
		this.$g(arguments).base = base;	
	}
}});