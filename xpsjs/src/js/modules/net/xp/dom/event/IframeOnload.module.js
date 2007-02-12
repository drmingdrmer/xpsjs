/**
 * TODO replace $util reference.
 */
new Module("net.xp.dom.event.IframeOnload",
[
	"net.xp.browser.BrowserDetect",
],function ($this, $name){
return {
   	/**
	* !!NOTE that this module is harmful. to set onload event may overwrite your original event handler.
	*/
	setIframeOnload : function (ifm, func){			
		if (this.is("IE")){
			var thiz = this;
			ifm.onreadystatechange = function (){
				var s = ifm.readyState;
				if (s == "complete"){
					func();
				}
			}
		} else if (this.is("Gecko")){
			ifm.addEventListener("load",func,true);
		} else {
			throw new Error ("do not support other browser yet.");
		}
	},
	removeIframeOnload : function (ifm, func){
		if (this.is("IE")){
			ifm.onreadystatechange = function (){}
		} else if (this.is("Gecko")){
			ifm.removeEventListener("load",func,true);
		} else {
			throw new Error ("do not support other browser yet.");
		}
	}
}});