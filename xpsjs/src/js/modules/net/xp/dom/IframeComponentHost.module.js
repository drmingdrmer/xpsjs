/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
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
	"net.xp.util.dom.$",
	"net.xp.util.dom.CSS",
	"net.xp.util.dom.Create"
],function ($this,$name){
return {

	_$initialize : function (){
	},
	
	/**
	 * get url util manipulating url
	 */
	_urlUtil : function (){
		var m = this._($name);
		m.urlUtil = m.urlUtil || Module.get("net.xp.util.URL").newInst();
		return m.urlUtil;
	},

	/**
	 * create of get the created iframe component class
	 */
	_getIfCompClz : function (){
		var m = this._($name);
		m.compClass = m.compClass || Module.get("net.xp.dom.IframeComponent").clz();
		return m.compClass;
	},
	
	/**
	 * get a collection assign to this host of iframe components.
	 * @param {Object} isByName
	 */
	_getIframeCollection : function (isByName){
		isByName = !!isByName;

		var m = this._($name);
		m.byId = m.byId || {};
		m.byName = m.byName || {};
		
		return isByName ? m.byName : m.byId;
	},
	
	/**
	 * add iframe component to collection. & indexed by name or id.<br>
	 * name is prefered.
	 * @param {Object} option
	 * @param {Object} ifmComp
	 */
	_addIframeCompToCollection : function (option,ifmComp){
		this._getIframeCollection(false)[option.id] = ifmComp;
		this._getIframeCollection(true)[option.name] = ifmComp;
	},
	
	/**
	 * get ifarme component by name or id
	 * @param {Object} opt
	 */
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
	 * 		option.fixSize
	 */
	createIframeComp : function(option) {
		var doc = this.$Doc();
		var ifm = this.createIframe(option, doc);

		var ifCompClz = this._getIfCompClz();
		var comp = new ifCompClz();

		var thiz = this;
		var src = option.src;

		//invoked when blank page set.
		var init = function () {
			comp.init(thiz, ifm, option.name || option.id, option.css, option.js);

			src && (ifm.contentWindow.location.href = src);
			thiz.removeIframeOnload(ifm, init);
			thiz.setIframeOnload(ifm, function(){
				thiz.responseToIframeRefresh(comp);
			});
		}
		this.setIframeOnload(ifm, init);


		this._addIframeCompToCollection(option, comp);
		return comp;
	},

	/**
	 * make existed iframe to an iframe component.
	 * @param {Object} iframe
	 * @param {Object} option contains infomation needed to create an iframe.<br>
	 * 		option.css
	 * 		option.js
	 * 		option.fixSize
	 */
	makeIframeComp : function (iframe,option){
		var doc = iframe.ownerDocument;
		var ifCompClz = this._getIfCompClz();

		var thiz = this;
		var comp = new ifCompClz();
		comp.init(this,iframe,iframe.name || iframe.id,option.css,option.js);
		this.setIframeOnload(iframe,function (){
			thiz.responseToIframeRefresh(comp);
		})
	},

	/**
	 * onload handler of iframe component
	 * @param {Object} comp
	 */
	responseToIframeRefresh : function (comp){
		comp.$Win().component = comp;
		this.injectCSS(comp);
		this.injectJS(comp);
	},
	
	/**
	 * inject css style that already exists in host window to iframe component's window.
	 * @param {Object} comp
	 */
	injectCSS : function (comp){
		var cssId = comp.getCSS();
		if (!cssId) return;
		
		var cssText = this.getAllRulesText(cssId);
		var styleNodeText = "<style>"
				+ cssText
				+ "<\/style>";
		var styleNode = this.nodeFromHtml(styleNodeText);
		this.$n("head", comp.$Doc()).appendChild(styleNode);
	},
	
	/**
	 * inject a piece of javascript to component's window.
	 * @param {Object} comp
	 */
	injectJS : function (comp){
		var js = comp.getJS();
		if (!js) return;
		comp.$Win().eval(js);
	},


/*-----------------------------------------------------------------------*\

command methods

\*-----------------------------------------------------------------------*/

	/**
	 * register predefined command for iframe component.
	 */
	registerDefaultCommand : function(){
		
		//inform a named component to load a url.
		this.registerCommand("load",function (name,src){
			this.getIframeComp({name:name}).$Win().location.href = src;
		});
		
	},
	
	/**
	 * add a command.
	 * a command can be a single function or a Runnable instance.<br>
	 * function command will be call with this component assigned as this reference.  
	 * 
	 * @param {Object} name
	 * @param {Object} cmd
	 */
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

	/**
	 * 
	 * @param {Object} name
	 */
	getCommand : function (name){
		var m = this._($name);
		return m[name] || function (){};
	},
	
	/**
	 * 
	 * @param {Object} cmdName
	 * @param {Object} params
	 */
	runCommand : function (cmdName,params){
		this.getCommand(cmdName).apply(null);
	}
	
	
}})