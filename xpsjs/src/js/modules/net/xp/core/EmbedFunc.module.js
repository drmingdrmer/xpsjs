/**-------------------------/// EmbedFunction \\\---------------------------
 *
 * <b></b>
 * @version : 
 * @since : 2008 02 14 14:47:45
 * 
 * @description :
 *   
 * @usage : 
 * 
 * @author : drdr.xp | drdr.xp@gmail.com
 *
 * @TODO : no break Label if only 1 return
 * 
 *--------------------------\\\ EmbedFunction ///---------------------------*/
new Module("net.xp.core.EmbedFunc", [
],function ($t, $n, $p, $g, $r, $c){
  /* private */

  var cache = {};

  function getFuncBody(fstr, withBrace) {

    var o = withBrace ? 0 : 1;

    var i = fstr.indexOf("{");
    var j = fstr.lastIndexOf("}");

    return fstr.substring(i+o, j+1-o);
  }

  function getFuncParam(fstr){

    var i = fstr.indexOf("(");
    var j = fstr.indexOf(")");

    return fstr.substring(i+1, j).split(/[, ]+/);
  }




  return {
    /* public */


    embedFunc : function (ftmp, femb, name, macro){

      if (!ftmp || !femb) 
	throw new Error("need 2 arguments but : " + ftmp + " and " + femb);

      if (typeof ftmp != 'function' || typeof femb != 'function') 
	throw new Error("2 arguments must all be function but : " + ftmp + " and " + femb); 


      var fts = ftmp.toString();
      var fes = femb.toString();

      /* check cache */
      cache[fts] = cache[fts] || {};
      if (cache[fts][fes]) {
	return cache[fts][fes];
      }


      var ftparam = getFuncParam(fts);
      var feparam = getFuncParam(fes);

      var tbody = getFuncBody(fts, false);
      var ebody = getFuncBody(fes, false);

      var singleReturn = ebody.indexOf("return ") == ebody.lastIndexOf("return ");

      if (!macro) {
	/* replace parameter name in embeded function */
	for (var i= 0; i < feparam.length; ++i){
	  var e = feparam[i];
	  var reg = new RegExp("\\b(" + e + ")\\b", "g");
	  ebody = ebody.replace(reg, "__$1");
	  feparam[i] = "__" + e;
	}

	/* add pseudo return point */
	tbody = "var __return_val__;" + tbody; 
	var retRpl = "__return_val__ = $1;"
	if (!singleReturn){
	  retRpl += "break __break_point;";
	}

	ebody = ebody.replace(/return (.*);/g, retRpl);			    /* replace return value assignment */
      }


      var invStr = "\\b(" + name + "\\b\\s*)\\(([^)]*)\\)";
      var invLineStr = "(.*)" + invStr + "(.*)";

      var invLineReg = new RegExp(invLineStr, "g");

      var replacer = function (s, beforeInv, invName, params, afterInv){
	var re = "";

	var ps = params.split(/[, ]+/);
	if (ps[0] == "") ps =[];

	for (var i= 0; i < feparam.length; ++i){
	  var e = feparam[i];
	  re += "var " + e + "= " + ps[i] + ";\n";
	}

	return re + (singleReturn ? "" : "__break_point:while(1)") + "{" + ebody + "}; " + beforeInv + " __return_val__ " + afterInv;
      } 

      /* embed */
      var newFB;
      if (macro) {
	newFB = tbody.replace(invLineReg, ebody); 
      } else {
	newFB = tbody.replace(invLineReg, replacer); 
      }

      /* create new function */
      var newFunc = Function.apply(null, ftparam.concat([newFB])); 

      console.log(newFunc.toString());

      /* add to cache */
      cache[fts][fes] = newFunc;

      /* debugger; */
      return newFunc;
    }
    
  }});

