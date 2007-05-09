new Module("net.xp.dom.Template",
[
    "net.xp.core.*"
],function ($this,$name){

	/* private properties */	
	var v_template = "template";
	var v_script = "script";
	var v_needCompile = "needCompile";

return {

	

	
	setTemplateString : function (str){
		this._set(v_template, str);
		this.setNeedRecompile();
	},

	getTemplateString : function (){
		return this._get(v_template);
	},



	setTemplateScript : function (script){
		this._set(v_script,script);
		this.setNeedRecompile(false);
	},

	getTempalteScript : function (){
		this.compileTemplate();
		return this._get(v_script);
	},



	
	needCompile : function (){
		return this._get(v_needCompile);
	},

	setNeedRecompile : function (t){
		this._set(v_needCompile,  t != false);
	},


	/**
	 * compile template html/xml to script
	 */
	compileTemplate : function (){
		var _template = this.getTemplateString();
		if ( _template == null){
			throw new Error("no template set");
		}
		if (!this.needCompile()) return;

		var r = ""; // inprocess script
		var temp = _template.replace(/\r|\n|\t/g,"") 		/* remove unnessesary blank, line break */
				.replace(/\<\!\-\-/gmi,"\02")				/* mark all start tags */
				.replace(/\-\-\>/gmi,"\03");				/* mark all end tags */

		var reg = /\02(.*?)\03|([^\02\03]*)/gmi;			/* tag matching regExp */


		temp.replace(reg,
				function(str, a){
					if (str == "") return;
					var scr;
					if (str.indexOf("\02") == 0){
						if (a.indexOf("=") ==0){
							scr = "s+="+a.substr(1)+";\n";
						} else {
							scr = a+";\n";
						}
					} else {
						scr = "s+='"+str+"';\n";
					}
					r += scr;
			   });

		Module.log("compiled scripte : \n"+r);
		this.setTemplateScript(r);

	},

	render : function (dataObject){
		dataObject = dataObject || {};
		var resultString = "";
		var r = this.getTempalteScript();
		eval(r);
		Module.log("render resut : \n"+resultString);
		return resultString;
	},

	makeElement : function (o){
		var e = this._renderInTempNode(o);
		return e.firstChild;
	},

	renderInto : function (o, tar){
		var e = this._renderInTempNode(o);
		var ar = e.childNodes, l = ar.length;
		for (var i=0; i<l; l--) {
			tar.appendChild(ar[i]);
		}
		delete e;
	},

	renderReplace : function (o,tar,tname,id){
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

	/**
	* update certain segment of this template.
	*/
	update : function (o, tar, tids, sids, opt){
		sids = sids || tids;
		opt = opt || {childOnly:true};
		var e = this.renderInTempNode(o);
		var nn = $util.$$(sids, e);
		var on = $util.$$(tids,tar);

		if (opt.childOnly) {
			on.innerHTML = "";
			this._replaceContent(on, nn);
		} else {
			var prn = on.parentNode;
			prn.insertBefore(nn, on);
			prn.removeChild(on);
		}
	},

	renderInTempNode : function (o){
		var e = $util.tempNode();
		e.innerHTML = this.render(o);
		return e;
	},

	_replaceContent : function (tar, src){
		this.alertD(src.innerHTML);
		tar.innerHTML = "";
		var ar = src.childNodes, l=ar.length;

		for (var i=0;i<l;l--){
			this.alertD("i="+i);
			this.alertD(ar[i]);
			this.alertD(ar[i].nodeType);
			this.alertD(ar[i].nodeName);

			tar.appendChild(ar[i]);
		}
		return tar;
	},

	_compareAndUpdate : function (o, n){
		if (o.nodeName == n.nodeName && o.nodeType == n.nodeType){

		} else {
		}
	}


}});