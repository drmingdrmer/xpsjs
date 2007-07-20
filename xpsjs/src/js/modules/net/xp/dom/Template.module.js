/**
 * @author xp
 * @mail yanbo@staff.sina.com.cn
 * @mail drdr.xp@gmail.com
 * extends str.Template of dom creation abilities
 */
new Module("net.xp.dom.Template",
[
    "net.xp.core.Core",
    "net.xp.str.Template",
    "net.xp.util.dom.Create"
],function ($this, $name){return {
  
  makeElement : function (o){
		return this.nodeFromHtml(this.render(o));
	},

	renderInto : function (o, container){
		var ar = this.renderInTempNode(o);
		for (var l = ar.length; 0<l; --l) {
			container.appendChild(ar[0]);
		}
		delete e;
	},

  renderReplace : function (o, tar, tname, id) {
		//TODO replace multi content.

		var prnt = tar.parentNode;

		var e = $util.tempNode();
		e.innerHTML = this.render(o);
		//
		var ar = e.getElementsByTagName(tname), l=ar.length;
		for (var i=0;i<l;i++){
			if (ar[i].id == id){
				this._replaceContent(ar[i],tar);
				break;
			}
		}
		if (i==l) throw new Error ("no such tag with the id.. tag : "+tname+". id : "+id);

		//add rendered element to doc.
		var ar = e.childNodes, l=ar.length;
		for (var i=0;i<l;i++){
			prnt.insertBefore(ar[i],tar);
		}


		prnt.removeChild(tar);
	},

//	/**
//	* update certain segment of this template.
//	*/
//	update : function (o, tar, tids, sids, opt){
//		sids = sids || tids;
//		opt = opt || {childOnly:true};
//		var e = this.renderInTempNode(o);
//		var nn = $util.$$(sids, e);
//		var on = $util.$$(tids,tar);
//
//		if (opt.childOnly) {
//			on.innerHTML = "";
//			this._replaceContent(on, nn);
//		} else {
//			var prn = on.parentNode;
//			prn.insertBefore(nn, on);
//			prn.removeChild(on);
//		}
//	},

	renderInTempNode : function (o){
		return this.allNodesFromHtml(this.render(o));
	},

	_replaceContent : function (tar, src){
		Module.log(src.innerHTML);
		tar.innerHTML = "";
		var ar = src.childNodes, l=ar.length;

		for (var i=0; i<l; l--){
			Module.log("i="+i);
			Module.log(ar[i]);
			Module.log(ar[i].nodeType);
			Module.log(ar[i].nodeName);

			tar.appendChild(ar[i]);
		}
		return tar;
	}
}});