/**
 * delegate to a iframe component.
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
new Module("net.xp.dom.IframeComponent",
[
	"net.xp.core.*",
	"net.xp.dom.WindowRelative"
],function ($this,$name){
	
return {
	init : function (host,iframe,name,css,js,fixSize){
		var m = this._();
		m.host = host;
		m.iframe = iframe;
		m.name = name;
		m.css = css;
		m.js = js;
		m.fixSize = !!fixSize;

		this.setWorkingWin(iframe.contentWindow);
	},

	getHost : function (){
		return this._get("host");
	},

	getIframe : function (){
		return this._get("iframe");
	},

	getName : function (){
		return this._get("name");
	},
	
	getCSS : function (){
		return this._get("css");
	},

	getJS : function (){
		return this._get("js");
	},

	isFixSize : function (){
		return this._get("fixSize");
	},


	addAutoSize : function (){
		if (this.isFixSize()) return;
		var ifm = this.getIframe();
		var win = this.$Win();
		var doc = this.$Doc();
		var _e = doc.documentElement;
		_e = _e.scrollHeight ? _e : doc.body;


		win.setInterval(function(){
			ifm.style.height = _e.scrollHeight + "px";
			ifm.style.width = _e.scrollWidth + "px";
		},500);
	},



	
	/**
	 * invoke an command of host window.
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	callCommand : function (cmd, params){
		this.getHost().runCommand(cmd, params || []);
	},
	
	/**
	 * when iframe component load finished, host window invoke this method to inform I.C. to start to work
	 */
	run : function (){
		//noinspection JSUnresolvedVariable
		var startupFunc = this.$Win().startup;
		if (startupFunc) startupFunc.apply(this.$Win(), [this.getHost(),this]);
	},

		
	/**
	 * invoked by host window to inform iframe component do something.  
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	doCommand : function (cmd, params){
		var win = this.$Win();
		var cmdFunc = win[cmd];
		if (cmdFunc != null){
			cmdFunc.apply(this.$Win(),params || []);
		} else {
			throw new Error ("no command with the name : "+cmd);
		}
		
	}
}})