new Module("net.xp.util.dom.Select",
[
	"net.xp.dom.DocRelative",
	"net.xp.util.dom.$"
],{
	/**
	* get element from ids.
	* 'form.list.input' 
	* 'form..input' 
	*/
	//TODO document relative searching.
	$$ : function (ids, root){
		var ar = ids.split("/");
		var i = 0;
		root = root || (i++, $util.$(ar[0]));
		if (root == null) return null;
		
		
		for (;i<ar.length;i++){
			var id = ar[i];
			if (id == "") continue;
			if (ar[i-1]=="") {//deal ".." symbol, to find element in all descendants.		
				var _al = root.getElementsByTagName("*"), _l = _al.length;				
				for (var k = 0;k<_l; k++){
					if (_al[k].id == id) {
						var s = $util.$$(ar.slice(i+1).join("/"),_al[k]);
						if (s != null) return s;
					}
				}
				return null;				
			} else {
				var sb = root.childNodes, jl = sb.length;
				for (var j=0;j<jl; j++){
					var n = sb[j];
					if (n.nodeType == 1 && n.id == id){ //get the matching element					
						root = n;
						break;
					}
				}
				if (j == jl) return null;
			}			
		}
		return root;
	},

	_voidFunc : function (){},


	getChildren : function (node, tagName, condition){
		tagName = (tagName || "*").toLowerCase();
		condition = condition || this._voidFunc;
		
		var r = [];
		var ar = node.childNodes || [],
			l = ar.length;
		
		for (var i=0; i<l; i++){
			var n = ar[i];
			if (n.nodeType != Node.ELEMENT_NODE) continue;
			if ((n.nodeName.toLowerCase() == tagName || tagName == "*") && condition(n)) r.push(n);
		}
		return r;
	},
	
	getDescendence : function (node, tagName, condition){
		tagName = (tagName || "*").toLowerCase();
		condition = condition || this._voidFunc;
		
		var r;
		try {
			var s = node.getElementsByTagName(tagName);
			var r = [];
			for (var i=0; i<s.length; i++) 
				if (condition(s[i])) r.push(s[i]);
		}
		catch (e) {}
		if (r == null){
			r = [node];
			for (var i=0; i<r.length; i++){
				var cs = this.getChildren(node, tagName, condition);
				r = r.concat(cs);
			}
			r.shift();
		}
		return r;
	},
	
	/**
	 * get node by xpath
	 * @param {Object} doc DOM document
	 * @param {Object} xpath String
	 * @return Array of Nodes
	 */
	getXP : function (root, xpath){
		var xpObjects = this._parseXPath(xpath);
		
		log(xpObjects);
		
		var r = [root];
		for (var i=0; i<xpObjects.length; i++){
			r = this._calculateXP(r, xpObjects[i]);
			log(r);
		}
		return r;
	},
	
	/**
	 * 
	 * @param {Object} nodeSet
	 * @param {Object} xpo
	 * @return (Array) node set
	 */
	_calculateXP : function (nodeSet, xpo){
		var newSet = [];
		for (var i=0; i<nodeSet.length; i++){
			var node = nodeSet[i];
			var tmpSet = this._getNodeSetByXPO(node, xpo);
			log("-------------temp:");
			log(tmpSet);
			
			newSet = newSet.concat(tmpSet); 
		}
		return newSet;
	},
	
	
	
	_getNodeSetByXPO : function (node, xpo){
		if (node.nodeType == null)
			throw new Error ("not a node : " + node);
		
		var ns;
		if (xpo.tagName != null){
			if (xpo.tagName == "..")
				ns = node.parentNode;
			else if (xpo.desc) 
				ns = this.getDescendence(node, xpo.tagName);
			else 
				ns = this.getChildren(node, xpo.tagName);
				
			if (xpo.condition != null) 
				ns = this._filterCondition(ns, xpo.condition);
		} else if (xpo.attr != null){
			var attrs = node.attributes || {},
				attr = attrs[xpo.attr];
			if (attr != null){
				ns = [{
					name 	: attr.nodeName,
					value 	: attr.nodeValue
				}];
			} else ns = [];
		}
		return ns;
	},
	
	_filterCondition : function (nodeSet, condStr){
		var ns = [];
		for (var i=0;i<nodeSet.length;i++){
			var node = nodeSet[i];
			if (this._isFit(node, condStr))
				ns.push(node);
		}
		return ns;
	},
	
	_isFit : function (node, cond){
		var i = parseInt(cond);
		if (!isNaN(i)){
			
		}
	},
	
	_parseXPath : function (xp){
		if (xp.indexOf("/") == 0) xp = "/" + xp;
		var reg = /\/\w*\/\.\.\//gi;
		while (reg.test(xp)) xp = xp.replace(reg,"/");
		xp = xp.replace(/[\/]{3,}/gi,"//");
		
		var ar = xp.split("/");
		var r = [];
		for (var i=0; i<ar.length; i++){
			var str = ar[i];
			if (str == "") continue;
			
			var desc = ar[i-1] == "";
			
			var regs = /(?:\[[\x00-\xff]*\])|(?:\@[^\@]*)|(?:([\w]|\.\.)+)/g;
			var reg = {
				tagName		: /([\w]|\.\.)+/,
				attr		: /\@[^\@]*/,
				condition	: /\[[\x00-\xff]*\]/
			}
			
			var v = str.match(regs);
			
			var condition=null,attr=null,tagName=null;
			
			for (var j=0; j<v.length; j++){
				if (reg.condition.test(v[j])){
					var condition = v[j].substr(1,v[j].length-2);
				} else if (reg.attr.test(v[j])){
					var attr = v[j].substr(1);
				} else if (reg.tagName.test(v[j])){
					var tagName = v[j];
				}
			}
			
			r.push({
				tagName		: tagName,
				condition	: condition,
				attr		: attr,
				desc		: desc,
				toString	: function (){
					return this.tagName+"["+this.condition+"]"+"@"+this.attr+"-"+this.desc;
				}
			});
		}
		return r;
	}

})