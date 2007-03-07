/**
 * 
 * @author xp yanbo@staff.sina.com.cn | drdr.xp@gmail.com
 * 
 */
var renderLib = {
	/**
	 * height
	 * color
	 */
	bevel8 : "<div "
				+ "style='"
					+ "position:absolute; "
					+ "line-height:0px; "
					+ "font-size:0px; "
					+ "width:100%; "
					+ "height:0%; "
				+ "' >"
					+ "<div style='"
						+ "position:relative; "
						+ "top : -$height$; "
						+ "border-bottom:$height$ solid $color$; "
						+ "border-left:$height$ solid transparent; "
						+ "border-right:$height$ solid transparent; "
					+ "' />"
				+ "<\/div>",

	bevel2 : "<div "
				+ "style='"
					+ "position:absolute; "
					+ "line-height:0px; "
					+ "font-size:0px; "
					+ "width:100%; "
					+ "height:0%; "
					+ "bottom:0px; "
				+ "' >"
					+ "<div style='"
						+ "position:relative; "
						+ "border-top:$height$ solid $color$; "
						+ "border-left:$height$ solid transparent; "
						+ "border-right:$height$ solid transparent; "
					+ "' />"
				+ "<\/div>",
	corner9 : "<div "
				+ "style='"
			  	+ "line-height:0px;"
			  	+ "font-size:0px;"
				+ "position:absolute; "
				+ "right:0px; "
				+ "top : 0px; "
				+ "border:0px solid #fff; "
				+ "border-right:$width$ solid $color$; "
				+ "border-bottom:$height$ solid transparent; ' "
				+ "/>",
	corner3 : "<div "
				+ "style='"
			  	+ "line-height:0px;"
			  	+ "font-size:0px;"
				+ "position:absolute; "
				+ "right:0px; "
				+ "bottom : 0px; "
				+ "border:0px solid #fff; "
				+ "border-right:$width$ solid $color$; "
				+ "border-top:$height$ solid transparent; ' "
				+ "/>"
}
var Render = {
	render: function (el,clz){
		var rule = this.getStyles(document)[clz];
		if (!rule) return;

		
		var r = clz.split(".");
		var type = r[0];

		el.style.position = "relative";
		var html = this.applyProperties(renderLib[type],rule);
		var node = this.nodeFromHtml(html);
		el.insertBefore(node,el.firstChild);
	},

	nodeFromHtml : function (html){
		var d = document.createElement("div");
		d.innerHTML = html;
		return d.firstChild;
	},
	
	applyProperties : function (html,rule){
		return html.replace(/\$(.*?)\$/g,function(s,a){
			return rule.style[a];
		});
	},
	
	getStyles : function (doc){
		var ar={};
		var ss=doc.styleSheets, l=ss.length;
		for (var i=0;i<l;i++){
			var sty=ss[i];
			var rules=sty.rules || sty.cssRules;
			
			var rl=rules.length;
			for (var j=0;j<rl;j++){
				var rule=rules[j], name=rule.selectorText;
				ar[name]=rule;
			}
		}
		
		return ar;
	}
}