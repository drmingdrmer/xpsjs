/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
new Module("net.xp.util.dom.Create",
[
	"net.xp.core.*",
	"net.xp.dom.WindowRelative"
],function ($this,$name){ return {

	createNode : function (name, attr, doc){
		attr = attr || {};
		var n = this.$Doc(doc).createElement(name);
		for (var i in attr)
			if (typeof attr[i] != "function" && Object.prototype[i] == null)
				n.setAttribute(i, attr[i]);
		return n;
	},
		
	tempNode : function (doc){
		return this.createNode("div",null,doc);
	},
	
	allNodesFromHtml : function (html, doc){
		var e = this.tempNode(doc);
		e.innerHTML = html;
		return e.childNodes;
	},
	
	nodeFromHtml : function (html, doc){
		return this.allNodesFromHtml(html, doc)[0];
	},
	
	/**
	 * 
	 * @param {Object} option contains infomation needed to create an iframe.<br>
	 * 		option.id
	 * 		option.name
	 * 		option.transparent
	 * @param {Object} doc
	 * @return {HTMLElement} iframe instance
	 */
	createIframe : function (option, doc){

		option.name = option.name || option.id;
		option.id = option.id != null ? option.id : option.name;
		
		option.transparent = option.transparent != null
				? option.transparent
				: false; 
		var html = "<iframe id='"+option.id+"' "
				 + "name='"+option.name+"' "
				 + "allowTransparency='"+option.transparent+"' "
				 + "scr='"+Module.loader.getBlankPageUrl()+"'><\/iframe>";
		return this.nodeFromHtml(html, doc);
	}
	
}})