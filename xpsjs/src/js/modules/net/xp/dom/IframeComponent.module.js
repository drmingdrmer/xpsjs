/**
 * delegate to a iframe component.
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
new Module("net.xp.dom.IframeComponent",
[
	"net.xp.core.Core",
	"net.xp.dom.WindowRelative"
],function ($this,$name){
	
return {
	init : function (host,iframe,name,css,js){
		var m = this._($name);
		m.host = host;
		m.iframe = iframe;
		m.name = name;
		m.css = css;
		m.js = js;

		this.setWorkingWin(iframe.contentWindow);
	},

	getName : function (){
		var m = this._($name);
		return m.name;
	},
	
	getIframe : function (){
		var m = this._($name);
		return m.iframe;
	},

	getHost : function (){
		var m = this._($name);
		return m.host;
	},

	
	/**
	 * invoke an command of host window.
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	callCommand : function (cmd, params){
		this.getHost().runCommand(cmd,params || []);
	},
	
	/**
	 * when iframe component load finished, host window invoke this method to inform I.C. to start to work
	 */
	run : function (){
		//noinspection JSUnresolvedVariable
		var startupFunc = this.$Win().startup;
		if (startupFunc) startupFunc.apply(this.$Win(),[this.getHost(),this]);
	},
	
	
	
	/**
	 * invoked by host window to inform iframe component do something.  
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	doCommand : function (cmd, params){
		var win = this.$Win();
		var cmdFunc = win[cmd];
		if (cmdFunc !== null){
			cmdFunc.apply(this.$Win(),params || []);
		} else {
			throw new Error ("no command with the name : "+cmd);
		}
		
	}
}})