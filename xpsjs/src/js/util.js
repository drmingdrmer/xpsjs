window.$f = {
	parseFunc : function (f){
		var r = {};
		f = f.toString();
		var args = (f.match(/^function\s*\((.*?)\)/) || [])[1];
		r.args = args.replace(/\s\t/g,"").split(",");
		
		var i = f.indexOf("{"), j = f.lastIndexOf("}");		
		r.body = f.substring(i+1,j);
		
		return r;
	},
	createFunc : function (r){
		return eval("f = function("+r.args.join(",")+"){"+r.body+"}");;
	}
}

var u = window.$util = {
	
	_excludeList : {
		_$m:true,
		_$g:true
	},
	
	setDefaultCopyAttrExcludeList : function (o){
		window.$util._exclucdeList = {};
		if (o instanceof Array){
			for (var i=0; i<o.length; i++) window.$util._exclucdeList[o[i].toString()] = true;
		} else {
			for (var i in o) window.$util._excludeList[i] = true;
		}
	},
	
	cpAttr : function (des, src, overwrite, exclude){
		if (des == null || src == null) throw new Error("source or destinition can not be null. source : "+src+"\n destinition : "+des);
		overwrite = overwrite == true;
		exclude = exclude || {};
		var _e = window.$util._excludeList;
		for (var i in src) if ((overwrite || des[i] == null) && exclude[i]==null && _e[i]==null) des[i] = src[i];
	},
	
	voidFunc : function (){},
	
	
	
	/**
	* select node by xPath.return an array.
	*/
	$t : function (node, xp){
		var ar = xp.split("/"), l=ar.length;
		for (var i=0; i<l; i++){
			if (ar[i] == "") continue;
			if (ar[i-1] == "") { //deal with all descendants
				
			} else {
				var xn = ar[i];
				if (xn == ".") continue;
				
			}
		}
	},
	
	
	
	/**
	* add event listener
	* 
	*/
	addEL : function(n, e, l, b){
		b = b != false;
		if ($util.$IE){
			n.attachEvent("on"+e,l);
		} else {
			n.addEventListener(e,l,b);
		}
	},
	
	getEventSrc : function (e){
		e = e || window.event;
		return e.target || e.srcElement;
	},
	
	
	
	urlParam : function (url, params){
		var s = [];
		for (var i in params) s[s.length] = i+"="+params[i];
		var l = url.indexOf("?") == -1 ? "?" : "&";
		if (s.length == 0) return url;
		else return url+l+s.join("&");	
	},
	
	getFuncName : function (func){
		if (func.getName) return func.getName();
		for (var i in window){
			if (window[i]==func){
				var name = i;
				func.getName=function (){
					return name;
				}
				return name;
			}
		}
		return null;
	},
	
	createGetFuncName : function (func,name){
		return function (){ return name;}
	},
	
	/**
	 * create a string which is a 'function call' like "someFunc()".
	 * the function is a member of window Object, and it has a unique name.
	 * create such a function call for use of willing to call a function with some parameters but you Cant create a function reference for some reason.
	 * I made this to fix the ugly dialog_utf_8.js coding bugs
	 */
	createFuncCall : function (func){
		var name = "_func_" + new Date().getTime()+Math.random();
		name=name.replace(/\./g,"");
		window[name] = func;
		return name+"();";
	}
	
	
	
	
	
	
	
}

var __$$init = function () {
	$util.ua 			= navigator.userAgent,
	$util.$IE 			= (navigator.appName == "Microsoft Internet Explorer"),
	$util.$IE5 			= $util.$IE && ($util.ua.indexOf('MSIE 5') != -1),
	$util.$IE5_0 		= $util.$IE && ($util.ua.indexOf('MSIE 5.0') != -1),
	$util.$IE6			= $util.$IE && ($util.ua.indexOf('MSIE 6') != -1),
	$util.$IE7			= $util.$IE && ($util.ua.indexOf('MSIE 7') != -1),
	$util.$Gecko 		= $util.ua.indexOf('Gecko') != -1,
	$util.$Safari 		= $util.ua.indexOf('Safari') != -1,
	$util.$Opera 		= $util.ua.indexOf('Opera') != -1,
	$util.$Mac 			= $util.ua.indexOf('Mac') != -1,
	$util.$NS7 			= $util.ua.indexOf('Netscape/7') != -1,
	$util.$NS71 		= $util.ua.indexOf('Netscape/7.1') != -1;
	if ($util.$Opera) {
		$util.$IE = true;
		$util.$Gecko = false;
		$util.$Safari =  false;
	}
	
}
__$$init();