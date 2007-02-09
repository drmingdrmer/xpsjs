/**
 * delegate to a iframe component.
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
new Module("net.xp.dom.IframeComponent",
[
	"net.xp.core.ModuleVars",
	"net.xp.dom.WindowRelative"
],function ($this,$name){
	
return {
	
	
	
	/**
	 * invoke an command of host window.
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	callCommand : function (cmd, params){
		
	},
	
	/**
	 * invoked by IframeCompHost
	 * @param {Object} iframe
	 * @param {Object} iframeWin
	 * @param {Object} hostWin
	 */
	_initIframeComp : function (iframe, iframeWin, hostWin){
		
		
	},
	
	/**
	 * when iframe component load finished, host window invoke this method to inform I.C. to start to work
	 */
	runIframeComp : function (){
		
	},
	
	
	
	/**
	 * invoked by host window to inform iframe component do something.  
	 * @param {Object} cmd
	 * @param {Object} params
	 */
	doCommand : function (cmd, params,$overridable){
		
	}
}})