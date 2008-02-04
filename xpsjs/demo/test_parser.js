var initPrototype = function () {
  function log(i) {
    document.getElementById("log").innerHTML += i + "\n";
  }
  window.print = log;
  $module.print = log;

  Array.prototype.each = function (insp) {
    for (var i = 0; i < this.length; i++) {
      insp(i, this[i]);
    }
  }
  Array.prototype.toString = function () {
    var str = "[";
    this.each(function (i, n) {
	str += "" + n + ", ";
      })
    return str + "]";
  }
  Object.prototype.each = function (insp) {
    for (var i in this) {
      if (this.constructor.prototype[i] != null) continue;
      insp(i, this[i]);
    }
  }
  Object.prototype.toString = function () {
    var s = "[\n";
    this.each(function (n, v) {
	if (typeof v == "object") s += " " + n + "=[object]";
	else s += "	" + n + " = " + v + "\n";
      });
    return s + "]";
  }

  $module.Array.prototype.toString = Array.prototype.toString;
  $module.Array.prototype.each = Array.prototype.each;
  $module.Object.prototype.toString = Object.prototype.toString;
  $module.Object.prototype.each = Object.prototype.each;
}

var job = function () {
  console.log("good");
  var doc = document;
  var sm = Module.get("net.xp.str.Parser");
  var inst = sm.newInst();


  inst.setList([
      ["null",/^(\s|\t|\r|\n)*/, null],
      ["invalid", /^(\s|\t|\r|\n)+/, null],
      ["id", /^[_$A-Za-z]+\w*/, null],
      //["number",/^\d+(\.\d+)?/,null],
      //["operator",/^\+|\-|\*|\/|\&|\^|\|/,null],
      //["string", "\"", /([^\"]|\\\")*/, "\"", null],
      ["idList", "$id", ","]
      //["params", "(", "$idList", ")", null],
      //["blocker", "{", "", "}", null],
      //["functionDef", "function", "$invalid", "$id", "$params", "$blocker", null],
      //["functionCall","$id","(","",")",null]
    ]);


  inst.setParseString("ab,c");
  //inst.setParseString("function xp(a,b,c){}");

  var match = inst.parse(0);
  inst.logStep("--->");
  inst.logTrace(match);
  //inst.parseNextOuterList(inst.getNextValidCharPosition(0));
  //inst.logStep("--->");
  //inst.parseNextOuterList(inst.getNextValidCharPosition(0));

}



function foo() {
  var ldr = new ModuleLoader(job);
  initPrototype();
  ldr.loadJS("Module.js");
  ldr.loadModules(["net.xp.str.Parser"]);
}
