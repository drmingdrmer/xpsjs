/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * TODO add command utilities.
 * TODO inject JS, CSS
 * TODO listen onload event
 */

Module.require([
	"net.xp.util.URL"
]);
//noinspection ObjectAllocationIgnored
new Module("net.xp.dom.IframeComponentHost",
[
	"net.xp.core.Core",
	"net.xp.dom.WindowRelative",
	"net.xp.dom.event.IframeOnload",
	"net.xp.util.dom.Create"
],function ($this,$name){
return {

	_$initialize : function (){
	},

	_uu : function (){
		var m = this._($name);
		m.urlUtil = m.urlUtil || Module.get("net.xp.util.URL").newInst();
		return m.urlUtil;
	},

	_getIframeCollection : function (isByName){
		isByName = !!isByName;

		var m = this._($name);
		m.byId = m.byId || {};
		m.byName = m.byName || {};
		
		return isByName ? m.byName : m.byId;
	},
	
	_appendIframeCompToCollection : function (option,ifm){
		this._getIframeCollection(false)[option.id] = ifm;
		this._getIframeCollection(true)[option.name] = ifm;
	},
	
	getIframeComp : function (opt){
		if (opt.name){
			return this._getIframeCollection(true)[opt.name];
		} else {
			return this._getIframeCollection(false)[opt.id];
		}
	},
	
	createIframeComp : function(option){
		var doc = this.$WDoc();
		var ifm = this.createIframe(option, doc);
		
		var ifc = Module.get("net.xp.dom.IframeComponent");
		
		
		var ifmHost = this;
		var src = option.src;

		//invoked when real content loaded
		var onIfmLoad = function (){
			ifmHost.removeIframeOnload(ifm,onIfmLoad);
			//TODO 
			var comp = (ifm.contentWindow.component = ifc.newInst());
		}

		//invoked when blank page set.
		var onInit = function (){
			ifm.contentWindow.location.href = src;
			ifmHost.removeIframeOnload(ifm,onInit);
			ifmHost.setIframeOnload(ifm, onIfmLoad);
		}
		
		this.setIframeOnload(ifm, onInit);
		
		this._appendIframeCompToCollection(option, ifm);
		return ifm;
	},

	registerCommand : function (cmd){
		if (typeof cmd == "function"){
			
		}
		
	}
	
	
}})