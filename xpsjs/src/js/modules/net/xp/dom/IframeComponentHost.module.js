/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * TODO add command utilities.
 * TODO inject JS, CSS
 * TODO listen onload event
 * TODO auto resize
 */

Module.require([
	"net.xp.util.URL",
	"net.xp.control.Runnable"
]);
//noinspection ObjectAllocationIgnored
new Module("net.xp.dom.IframeComponentHost",
[
	"net.xp.core.Core",
	"net.xp.dom.WindowRelative",
	"net.xp.dom.event.IframeOnload",
	"net.xp.util.dom.CSS",
	"net.xp.util.dom.Create"
],function ($this,$name){
return {

	_$initialize : function (){
	},

	_urlUtil : function (){
		var m = this._($name);
		m.urlUtil = m.urlUtil || Module.get("net.xp.util.URL").newInst();
		return m.urlUtil;
	},

	_ifCmp : function (){
		return Module.get("net.xp.dom.IframeComponent");
	},

	_getIframeCollection : function (isByName){
		isByName = !!isByName;

		var m = this._($name);
		m.byId = m.byId || {};
		m.byName = m.byName || {};
		
		return isByName ? m.byName : m.byId;
	},
	
	_addIframeCompToCollection : function (option,ifm){
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

	/**
	 * @param {Object} option contains infomation needed to create an iframe.<br>
	 * 		option.id
	 * 		option.name
	 * 		option.transparent
	 * 		option.src
	 */
	createIframeComp : function(option) {
		var doc = this.$Doc();
		var ifm = this.createIframe(option, doc);

		var ifc = this._ifCmp();


		var ifmHost = this;
		var src = option.src;

		//invoked when real content loaded
		var onIfmLoad = function () {
			ifmHost.removeIframeOnload(ifm, onIfmLoad);
			//TODO finish it
			var comp = (ifm.contentWindow.component = ifc.newInst());
		}

		if (option.src !== null) {
			//invoked when blank page set.
			var onInit = function () {
				ifm.contentWindow.location.href = src;
				ifmHost.removeIframeOnload(ifm, onInit);
				ifmHost.setIframeOnload(ifm, onIfmLoad);
			}

			this.setIframeOnload(ifm, onInit);
		}


		this._addIframeCompToCollection(option, ifm);
		return ifm;
	},

	makeIframeComp : function (iframe){
		var doc = iframe.ownerDocument;
		var ifc = this._ifCmp();
	},

	/**
	 * onload handler of iframe component
	 * @param {Object} comp
	 */
	responseToIframeOnload : function (comp){
		this.injectCSS(comp);
		this.injectJS(comp);
	},

	injectCSS : function (comp){

	},

	injectJS : function (comp){

	},


/*-----------------------------------------------------------------------*\

command methods

\*-----------------------------------------------------------------------*/

	registerDefaultCommand : function(){
		this.registerCommand("load",function (name,src){
			this.getIframeComp({name:name}).$Win().location.href = src;
		});
		
	},
	
	registerCommand : function (name,cmd){
		var m = this._($name);
		if (m[name])
			throw new Error("the command name already exists : " + name);
		
		if (typeof cmd == "function"){
			var thiz = this;
			m[name] = function (){
				cmd.apply(thiz,arguments);
			}
		} else if (Module.get("net.xp.control.Runnable").compatableTo(cmd)) {
			m[name] = function (){
				cmd.run();
			}
		}
		return m.name;
	},

	getCommand : function (name){
		var m = this._($name);
		return m[name] || function (){};
	},

	runCommand : function (cmdName,params){
		this.getCommand(cmdName).apply(null);
	}
	
	
}})