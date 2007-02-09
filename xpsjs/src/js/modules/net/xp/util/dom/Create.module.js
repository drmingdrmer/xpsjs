/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
new Module("net.xp.util.dom.Create",
[
	"net.xp.core.ModuleVars",
	"net.xp.dom.DocRelative"
],{

	createNode : function (name, attr, doc){
		attr = attr || {};
		var n = this.$Doc(doc).createElement(name);
		for (var i in attr) n.setAttribute(i, attr[i]);
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
	
	createIframe : function (option, doc){
		option.id = option.id != null ? option.id : "iframe";
		option.name = option.name || option.id;
		option.transparent = option.transparent != null ? option.transparent : false; 
		var html = "<iframe id='"+option.id+"' "
				 + "name='"+option.name+"' "
				 + "allowTransparency='"+option.transparent+"' "
				 + "scr='"+Loader.getBlankPageUrl()+"'></iframe>";
		return this.nodeFromHtml(html, doc);
	},
	
})