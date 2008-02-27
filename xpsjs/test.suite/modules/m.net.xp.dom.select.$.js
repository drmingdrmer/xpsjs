/* TODO test windowRelative first */



/* dom utils */
function byClazz(d, t, c){
  c = " " + c + " ";

  var s = d.getElementsByTagName(t);

  var re = [];
  for (var i= 0; i < s.length; ++i){
    var e = " " + s[i].className + " ";
    if (e.className.indexOf(c) >= 0){
      re.push(s[i]);
    }
  }

  return re;
}


/* test start */
function test_attr_select_type(){
  var m = Module.get("net.xp.dom.select.$");
  var s = m.newInst([document]);

  function _test_ele(m, d, s, t){
    var all = s.$(t).arr();

    assertObjectEquals(m, 
      d.getElementsByTagName(t), 
      all);
  }

  _test_ele("all element"  , document, s, "*");
  _test_ele("table element", document, s, "tAble");
  _test_ele("tr element"   , document, s, "tr");
  _test_ele("a element"    , document, s, "a");
}

/* function test_attr_select_class(){ */
  /* var m = Module.get("net.xp.dom.select.$"); */
  /* var s = m.newInst(); */

  /* function _test_class(m, d, s, t, c){ */
    /* var all = s.$(t+"."+c).arr(); */

    /* assertObjectEquals(m,  */
      /* byClazz(d, t, c); */
      /* all); */
  /* } */

  /* _test_class("a.light", document, s, "a", "light"); */
  /* _test_class("*.dark", document, s, "*", "dark"); */
/* } */

function test_attr_id(){
  var m = Module.get("net.xp.dom.select.$");
  var s = m.newInst();

  /* function _test_class(m, d, s, t, c){ */
    /* var all = s.$(t+"."+c).arr(); */

    /* assertObjectEquals(m,  */
      /* byClazz(d, t, c); */
      /* all); */
  /* } */

  /* _test_class("a.light", document, s, "a", "light"); */
  /* _test_class("*.dark", document, s, "*", "dark"); */
}

function test_attr_has_attr(){
  var m = Module.get("net.xp.dom.select.$");
  var s = m.newInst();

  /* function _test_has(m, d, s, t, c){ */
    /* var all = s.$(t+"."+c).arr(); */

    /* assertObjectEquals(m,  */
      /* byClazz(d, t, c); */
      /* all); */
  /* } */

  /* _test_class("a[light]", document, s, "a", "light"); */
  /* _test_class("*.dark", document, s, "*", "dark"); */
}

function test_pseudo_class(){
  var m = Module.get("net.xp.dom.select.$");

}

/**
 * type, class, attr, pseudo class
 */
function test_multi_condition(){
  var m = Module.get("net.xp.dom.select.$");

}


function test_combinator(){
  var m = Module.get("net.xp.dom.select.$");

}


