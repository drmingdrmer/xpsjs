new Module("net.xp.dom.Template",
[
    "net.xp.core.*",
    "net.xp.util.dom.Create" /* TODO remove this requisistion if no dom support needed */
],function ($this,$name){

	/* local constant variables */	
	var TEMPLATE = "template";
	var RENDER = "render";
	var NEED_COMPILE = "isNeedCompile";

return {

	/**
	 * set & store string as template source
	 * @param {Object} str
	 */
	setTemplateString : function (str){
		this._set(TEMPLATE, str);
		this.setNeedRecompile(true);
	},

	getTemplateString : function (){
		return this._get(TEMPLATE);
	},


	/**
	 * private, set script compiled from template & used to output html/xml result.
	 * @param {Object} script
	 */
	setRender : function (script){
    this._set(RENDER, script);
		this.setNeedRecompile(false);
	},

	getRender : function (){
		this.compileTemplate();
		return this._get(RENDER);
	},



	/**
	 * whether this Template instance need compiling to javascript or tempalte script has
	 * already existed.
	 */
	isNeedCompile : function (){
		return this._get(NEED_COMPILE);
	},

	setNeedRecompile : function (t){
		this._set(NEED_COMPILE,  t != false);
	},


	/**
	 * compile template html/xml to script
	 * TODO refined on 07.07.21, test it
	 */
	compileTemplate : function (){
    //already compiled?
    if (!this.isNeedCompile()) return;
    
    var _template = this.getTemplateString();

    //template string hs been set?
    if ( _template == null){ throw new Error("no template set"); }

		//script source.
		var r = []; // inprocess script
		var temp = _template.replace(/\r|\n|\t/g,"") 		      /* remove unnessesary blank, line break */
                        .replace(/\<\!\-\-\=?\-\-\>/, "") /* remove empty comments */ 
                        .replace(/\<\!\-\-/gmi,"\ufffe")  /* mark all start tags */
                        .replace(/\-\-\>/gmi,"\uffff");	  /* mark all end tags */

		//compile
		var reg = /\ufffe(.*?)\uffff|([^\ufffe\uffff]*)/gmi;			/* tag matching regExp */

		/*
		 * compilation deal with 2 types of script tag. <!--src--> & <!--=value-->.
		 * Script tags are actually html comments, which contains some javascript codes.
		 * Compilation is such a progress that convert scripts in comments to real script;
		 * and convert normal html/xml tags to strings which are in compiled script.
		 * 
		 */
		temp.replace(reg,
				function(str, a){
					if (str == "") return;
					var scriptPiece;
					if (str.indexOf("\ufffe") == 0){
						if (a.indexOf("=") ==0){
							scriptPiece = "s+="+a.substr(1);
						} else {
							scriptPiece = a;
						}
					} else {
						scriptPiece = "s+='"+str.replace(/\'/g, "\\'") +"'";
					}
					r.push(scriptPiece);
			   });
    
    r = "var s='';"+r.join(";\n")+";return s;";
    
    /* create a function as renderer, o is the only parameter contains data needed for rendering */
    r = new Function ("o", r);
		Module.log("compiled scripte : \n"+r.toString());
		this.setRender(r);
	},

	render : function (o){
		o = o || {};
		var s = this.getRender()(o);
		Module.log("render resut : \n"+s);
		return s;
	},

  //TODO move element rendering to another Module
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