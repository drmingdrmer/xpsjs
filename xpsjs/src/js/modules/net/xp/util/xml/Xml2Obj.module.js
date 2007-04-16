/**
* xml to object
* use nodeA.nodeB to reference a single child node.
* use nodeA.nodeB[i] to reference one of sequence nodes.
* use nodeA.$.attr to reference attributes of nodeA.
* to retrieve the original node represented by nodeA, use nodeA.$node.
*/
new Module("net.xp.util.xml.Xml2Obj",
[
	"net.xp.core.ModuleVars"
],{
	$initialize : function (){
	},
	
	xml2obj : function (node, forceArray){
		forceArray = forceArray == null ? false : forceArray;
		
		var o = this.createNode(node);
		
		this.generateChildNode(node, forceArray, o);
		o.$ = this.generateAttributes(node);
		
		//o.$by = {};
		return o;
	},
	
	createNode : function (node){
		var o = {};
		o.$node = node;
		//get attribte valur or the first text node value as o node value.
		o.$v = node.nodeValue || (node.firstChild ? node.firstChild.nodeValue : null);
		return o;
	},
	
	generateChildNode : function (node, forceArray, o){
		var ar = node.childNodes || [], 
			l=ar.length;
		for (var i=0; i<l; i++){
			var nd = ar[i],
				nn = nd.nodeName,
				cur = o[nn],
				newNode = this.xml2obj(nd, forceArray);
				
			if (cur){
				if (!(cur instanceof Array)) o[nn]=[cur,newNode];					
				else cur.push(newNode);
			} else 
				o[nn] = forceArray ? [newNode] : newNode;			
		}
	},
	
	generateAttributes : function (node){
		var ar = node.attributes || [], 
			l = ar.length;
		var o = {};
		for (var i=0; i<l ;i++) {
			var name = ar[i].nodeName, value = ar[i].nodeValue;
			o[name] = value;				
		}
		return o;
	}
});