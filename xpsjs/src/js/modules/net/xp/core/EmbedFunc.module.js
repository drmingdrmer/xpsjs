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


    embedFunc : function (ftmp, femb, name){

      if (!ftmp || !femb) 
	throw new Error("need 2 arguments but : " + ftmp + " and " + femb);

      if (typeof ftmp != 'function' || typeof femb != 'function') 
	throw new Error("2 arguments must all be function but : " + ftmp + " and " + femb); 

      var singleReturn;

      var fts = ftmp.toString();
      var fes = femb.toString();

      var ftparam = getFuncParam(fts);
      var feparam = getFuncParam(fes);

      var tbody = getFuncBody(fts, false);
      var ebody = getFuncBody(fes, false);

      /* console.log("ebody"); */
      /* console.log(ebody); */

      singleReturn = ebody.indexOf("return ") == ebody.lastIndexOf("return ");
      console.log(singleReturn);

      tbody = "var __return_val__;" + tbody; /* add pseudo return point */

      if (singleReturn){
	ebody = ebody.replace(/return (.*);/g, "__return_val__ = $1;");			    /* replace return return value assignment */
      } else {
	ebody = ebody.replace(/return (.*);/g, "__return_val__ = $1;break __break_point;"); /* replace return with break */
      }

      /* TODO for now no parameter support */

      var invStr = "\\b(" + name + "\\b\\s*)\\(([^)]*)\\)";
      var invLineStr = "(.*)" + invStr + "(.*)";

      var invLineReg = new RegExp(invLineStr, "g");

      if (singleReturn){
	/* replace function call to inline codes */
	var newFB = tbody.replace(invLineReg, function (s, s1, s2, s3, s4){
	    var re = "";

	    var ps = s3.split(/[, ]+/);
	    if (ps[0] == "") ps =[];

	    for (var i= 0; i < feparam.length; ++i){
	      var e = feparam[i];
	      re += "var " + e + "= " + ps[i] + ";\n";
	    }

	    return re + "{" + ebody + "}; "+s1 +" __return_val__ " + s4;
	  }); 
      } else {
	var newFB = tbody.replace(invLineReg, function (s, s1, s2, s3, s4){
	    var re = "";

	    console.log("s3 = ",  s1, s2, s3, s4);
	    var ps = s3.split(/[, ]+/);
	    if (ps[0] == "") ps =[];

	    for (var i= 0; i < feparam.length; ++i){
	      var e = feparam[i];
	      re += "var " + e + "= " + ps[i] + ";\n";
	    }

	    return re + "__break_point:while(1){" + ebody + "}; "+s1 +" __return_val__ " + s4;
	  }); 
	/* var newFB = tbody.replace(invLineReg, "__break_point:while(1){" + ebody + "}; $1 __return_val__ $4"); |+ replace function call to inline codes +| */
      }
      console.log(newFB);

      var newFunc = Function.apply(null, ftparam.concat([newFB])); /* create new function */
      console.log(newFunc.toString());

      /* debugger; */
      return newFunc;
    }
    
  }});

