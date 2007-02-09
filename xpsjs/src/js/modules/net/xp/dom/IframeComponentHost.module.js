/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * TODO add command utilities.
 */

Module.require([
	"net.xp.util.URL"
]);
new Module("net.xp.dom.IframeComponentHost",
[
	"net.xp.core.ModuleVars",
	"net.xp.dom.WindowRelative",
	"net.xp.dom.event.IframeOnload",
	"net.xp.util.dom.Create"
],{
	_$initialize : function (){
		var urlUtil = Module.get("net.xp.util.URL").newInst();
		this.$sv(arguments,"url",urlUtil);
	},
	
	
	_getIframeSet : function (isByName){
		isByName = isByName != false;
		
		var m = this.$m(arguments);
		m.byId = m.byId || {};
		m.byName = m.byName || {};
		
		return isByName ? m.byName : m.byId;
	},
	
	_appendIframeComp : function (option,ifm){
		this._getIframeSet(false)[option.id] = ifm;
		this._getIframeSet(true)[option.name] = ifm;
	},
	
	getIframeComp : function (opt){
		if (opt.name){
			return this._getIframeSet(true)[opt.name];
		} else {
			return this._getIframeSet(false)[opt.id];
		}
	},
	
	createIframeComp : function(option){
		var doc = this.$WDoc();
		var ifm = this.createIframe(option, doc);
		this._appendIframeComp(option, ifm);
		
		var ifc = Module.get("net.xp.dom.IframeComponent");
		
		
		var ifmHost = this;
		var src = option.src;
		//invoked when blank page set.
		var onInit = function (){
			ifm.contentWindow.location.href = src;
			ifmHost.removeIframeOnload(ifm,onInit);
			ifmHost.setIframeOnload(ifm, onIfmLoad);
		}
		
		//invoked when real content loaded 
		var onIfmLoad = function (){
			ifmHost.removeIframeOnload(ifm,onIfmLoad);
			
			var comp = (ifm.contentWindow.component = ifc.newInst());
			
		}
		
		this.setIframeOnload(ifm, onInit);
		
		
		return ifm;
	}
	
	
})