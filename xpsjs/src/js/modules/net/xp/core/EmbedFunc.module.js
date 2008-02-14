new Module("net.xp.core.EmbedFunc", [
],function ($t, $n, $p, $g, $r, $c){
  /* private */

  function getFuncBody(fstr, withBrace) {

    var o = withBrace ? 0 : 1;

    var i = fstr.indexOf("{");
    var j = fstr.indexOf("}");

    return fstr.substring(i+o, j+1-o);
  }

  function getFuncParam(fstr){

    var i = fstr.indexOf("(");
    var j = fstr.indexOf(")");

    return fstr.substring(i+1, j).split(/[, ]+/);
  }




  return {
    /* public */


    embedFunc : function (ftmp, femb){

      if (!ftmp || !femb) 
	throw new Error("need 2 arguments but : " + ftmp + " and " + femb);

      if (typeof ftmp != 'function' || typeof femb != 'function') 
	throw new Error("2 arguments must all be function but : " + ftmp + " and " + femb); 

      if (femb.name == "") 
	throw new Error ("the embeded function must hv name");


      var fts = ftmp.toString();
      var fes = femb.toString();

      var ftparam = getFuncParam(fts);

      var tbody = getFuncBody(fts);
      var ebody = getFuncBody(fes, true);

      ebody = ebody.replace(/return (.*);/g, "throw $1;");

      /* TODO for now no parameter support */
      var invStr = "\\b(" + femb.name + "\\b\\s*\\(\\))";
      var invLineStr = "(.*)" + invStr + "(.*)";

      var invLineReg = new RegExp(invLineStr, "g");

      var newFB = tbody.replace(invLineReg, "try{" + ebody + "}catch(_ret_val){__return_value__ = _ret_val;} $1 __return_value__ $3");
      console.log(newFB);

      var newFunc = Function.apply(null, ftparam.concat([newFB]));
      console.log(newFunc.toString());

      /* debugger; */
      return newFunc;
    }
    
  }});

