var x = new Module(
	"net.xp.str.Properties",
   {
	   setDelimit : function (s){
		   s = (s == null || s == "") ? " " : s;
		   this._$m.delimit = s;
	   },
	   
	   getDelimit : function (s){
		   return this._$m.delimit || "||";
	   },
	   
	   useSpaceDelimit : function (t){
		   this["__$module.net.xp.str.Properties.useSpace"] = t == true;
	   },
	   
	   isSpaceDelimit : function (){
		   return this["__$module.net.xp.str.Properties.useSpace"] == true;
	   },
	   
	   getString : function (){
		   return this["__$module.net.xp.str.Properties.string"];
	   },
	   
	   getProperty : function (name){
			var ps = this["__$module.net.xp.str.Properties.pros"] || {};
			this["__$module.net.xp.str.Properties.pros"] = ps ;
			
			return ps["_proname_"+name];
	   },
	   
	   setProperty : function (name, value){
			var ps = this["__$module.net.xp.str.Properties.pros"] || {};
			this["__$module.net.xp.str.Properties.pros"] = ps;
			
			ps["_proname_"+name] = value;
	   },
	   
	   serializeProperties : function (){
		    var s = "";
		    var ps = this["__$module.net.xp.str.Properties.pros"] || {};
			for (var i in ps){
				if (i.indexOf("_proname_") == 0) {
					s += i.replace("_proname_","") + "=" + ps[i]+"\n";
				}
			}
			
			this["__$module.net.xp.str.Properties.string"] = s;
			return s;
	   },
	   
	   parseProperties : function (str){
			str = str || "";
			str = str.replace(/\s*=\s*/gi,"=").replace(/[\r\n]+/gi,"\n");
			var ps = this["__$module.net.xp.str.Properties.pros"] = {};
			this["__$module.net.xp.str.Properties.string"] = str;
			
			var parseFunc = function (s, n, v){
				ps["_proname_"+n]=v;
			}
			
			var del = this.getDelimit().replace(/(\|)/gi,"\\$1");
		
			str = str.replace(new RegExp(del,"gi"),"\01");
			
			var reg = new RegExp("([^=\\01]*)=([^\\01]*)","gi");
			
			
			
			str.replace(reg, parseFunc);
			
	   },
	   
	   listNames : function (){
		   var names = []
		   var ps = this["__$module.net.xp.str.Properties.pros"] || {};
		   for (var i in ps){
				if (i.indexOf("_proname_") == 0) {
					names[names.length] = i.replace("_proname_","");
				}
			}
			return names;
	   },
	   
	   getList : function (){
		   var list = []
		   var ps = this["__$module.net.xp.str.Properties.pros"] || {};
		   for (var i in ps){
				if (i.indexOf("_proname_") == 0) {
					list[list.length] = {name:i.replace("_proname_",""), value:ps[i]};
				}
			}
			return list;
	   },
	   
	   getPropertyObj : function (){
		   var lst = this.getList();
		   var o = {};
		   for (var i=0; i<lst.length;i++){
			   var n = lst[i].name;
			   var v = lst[i].value;
			   o[n]=v;
		   }
		   this.__standup(o);
		   return o;
	   },
	   
	   __standup : function (o){
		   for (var i in o){
			  
			  var ar = i.split(".");
			  if (ar.length>1){
				  var r = o;
				  for (var j=0;j<ar.length-1;j++){
					  var n = ar[j];
					  r[n] = r[n] || {};
					  r=r[n];
				  }
				  r[ar[ar.length-1]] = o[i];
				  delete o[i];		
			  }
		   }
	   }
	});