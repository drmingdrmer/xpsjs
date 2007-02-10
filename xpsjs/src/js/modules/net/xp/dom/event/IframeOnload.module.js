/**
 * TODO replace $util reference.
 */
new Module("net.xp.dom.event.IframeOnload",
[
],function ($this, $name){
return {
   	/**
	* !!NOTE that this module is harmful. to set onload event may overwrite your original event handler.
	*/
	setIframeOnload : function (ifm, func){			
		if ($util.$IE){
			var thiz = this;
			ifm.onreadystatechange = function (){
				var s = ifm.readyState;
				if (s == "complete"){
					func();
				}
			}
		} else if ($util.$Gecko){
			ifm.addEventListener("load",func,true);
		} else {
			throw new Error ("do not support other browser yet.");
		}
	},
	removeIframeOnload : function (ifm, func){
		if ($util.$IE){
			ifm.onreadystatechange = function (){}
		} else if ($util.$Gecko){
			ifm.removeEventListener("load",func,true);
		} else {
			throw new Error ("do not support other browser yet.");
		}
	}
}});