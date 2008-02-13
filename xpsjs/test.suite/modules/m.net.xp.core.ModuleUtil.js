/**-------------------------/// ModuleUtil \\\---------------------------
 *
 * <b></b>
 * @version : 1.0
 * @since : 2008 02 13 16:03:39
 * 
 * @description :
 *   
 * @usage : 
 * 
 * @author : drdr.xp | drdr.xp@gmail.com
 * @copyright sina.com.cn 
 * @TODO : mixing module to normal object 
 * 
 *--------------------------\\\ ModuleUtil ///---------------------------*/


var inited = false;

function create_mods(){
  if (inited) return;

  new Module("test.other_1.ModA", [], {});
  new Module("test.other_2.ModA", [], {});

  Module.require([
      "test.T2", 
      "test.other_1.ModA", 
      "test.other_2.ModA", 
    ]);
  new Module("test.xp.core.ModuleUtil", [
      "net.xp.core.ModuleUtil"
    ], {
      $initialize  : function (){
	Module.initedSample = true;
      },
      sampleMethod : function (){ },
      ovf          : function ($overridable){ },
      novf         : function (){ },
      $constructor : function (a, b, c){
	this.a = [a, b, c];
      },
      $M_delegate  : function (n) { return this.$M(n);}

    });

  new Module("test.xp.Sample", [], {
      $initialize  : function (){
	Module.initedSample = true;
      },
      sampleMethod : function (){ },
      ovf          : function ($overridable){ },
      novf         : function (){ },
      $constructor : function (a, b, c){
	this.a = [a, b, c];
      }
    });

  new Module("test.xp.SampleMore", [
      "test.xp.Sample"
      /* ,  */
      /* "test.xp.Empty" */
    ], {
      ovf : function ($overridable){
	var more;
      }
    });

  new Module("test.T2", [ ],
    function ($this, $name){return {
	test : function (){ }
      }});

  inited = true;
}

function test_compatable(){
  create_mods();

  //compatable
  var clz = function (){ }

  clz.prototype = {
    sampleMethod : function (){},
    ovf          : function ($overridable){},
    novf         : function (){}, 
    $M_delegate	 : function (){}
  }
  var sm = Module.get("test.xp.core.ModuleUtil");
  assertTrue("compatable to clz",
    sm.compatableTo(clz));

  assertTrue("compatable to clz instance",
    sm.compatableTo(new clz()));

  clz.prototype.novf = null;
  assertFalse("not compatable to clz",
    sm.compatableTo(clz));

  assertFalse("not compatable to clz instance",
    sm.compatableTo(new clz()));


  assertFalse("not compatable to null",
    sm.compatableTo(null));

}

function test_mixTo(){
  create_mods();

  //mixTo
  var sm = Module.get("test.xp.core.ModuleUtil");
  var o = function (){};
  sm.mixTo(o);
  assertEquals("sampleMethod from test.xp.Sample",
    sm.sampleMethod,
    o.prototype.sampleMethod);
  assertEquals("ovf from test.xp.Sample",
    sm.ovf,
    o.prototype.ovf);
  assertEquals("novf from test.xp.Sample",
    sm.novf,
    o.prototype.novf);

  assertTrue("compatable to o",
    sm.compatableTo(o));

  try{
    sm.mixTo(o);
  } catch(e){
    fail("the same module should not cause an error");
  }

  o.prototype.ovf = function (){}
  try{
    sm.mixTo(o);
    fail("different method should cause an error");
  } catch(e){}
}

/* Added clz should initialize module vars automatically	08-02-13 */
function test_clz(){
  create_mods();
  //clz
  var sm = Module.get("test.xp.core.ModuleUtil");
  var sClz = sm.clz({m:5});
  var sIns = new sClz();

  assertEquals("use object hash as properties list : m = 5",
    5,
    sIns.m);

  assertEquals("prototype.sampleMethod",
    sm.sampleMethod,
    sClz.prototype.sampleMethod);


  /* test auto-inited module-vars */
  var mm = new Module("TestClzModVar", 
    ["net.xp.core.ModuleUtil"], 
    function ($t, $n, $p, $g, $r, $c){
      return {
	getValue : function(){
	  this[$n].value = this[$n].value || 3;
	  return ++this[$n].value;
	}
      }
    });

  var clz0 = mm.clz({});
  var ins0 = new clz0();
  assertNotError("use this[$n] without init", 
    function (){ins0.getValue();});

  var clz1 = mm.clz(function (){
      this.value = 5;
    });
  var ins1 = new clz1();

  assertEquals("create class use constructor", 
    5, 
    ins1.value);

  assertNotError("use this[$n] without init, creating clz with constructor", 
    function (){ins1.getValue();});

}

/* TODO newInst should initialize module vars automatically */
function test_newInst(){

  create_mods();

  //newInst
  var sm = Module.get("test.xp.core.ModuleUtil");
  var x = sm.newInst(null);

  assertTrue("x.sampleMethod is not null",
    x.sampleMethod != null);

  assertEquals("x.sampleMethod",
    x.sampleMethod,
    sm.sampleMethod);

  var y = sm.newInst({a:5, b:3});

  assertEquals("y.a",
    5,
    y.a);
  
  assertEquals("y.b",
    3,
    y.b);

  assertTrue("y.sampleMethod is not null",
    y.sampleMethod != null);

  assertEquals("y.sampleMethod",
    y.sampleMethod,
    sm.sampleMethod);

  var tmp = 0;
  var clzs = function (){
    this.p = 5;
    tmp = "_initedMark";
  }
  var z = sm.newInst(clzs);

  assertEquals("clz inited",
    "_initedMark",
    tmp);

  assertEquals("z.p",
    5,
    z.p);

  assertTrue("z.sampleMethod is not null",
    z.sampleMethod != null);
  
  assertEquals("z.sampleMethod",
    z.sampleMethod,
    sm.sampleMethod);
}

function test_constructor(){
  create_mods();
  //_$defaultConstructor
  var sm = Module.get("test.xp.core.ModuleUtil");
  var inst2 = sm.newInst([1,
      2,
      3]);
  assertEquals("should be 123",
    [1,
      2,
      3].join(),
    inst2.a.join());
}

/**
 * $M to fetch required module 
 *
 * .xx.Name is a partial name
 * xx.yy.Name is a full path name
 *
 * @return {null} if no module found.
 *	   {module} if only 1 module found.
 *	   {Error} if more than 1 module found.
 *
 * What To Test : 
 *    $M to get Module with only name from required modules
 *	  partial name must start with a dot.
 *    $M to get Module with only partail package and name from required
 *	  partial name must start with a dot.
 *    $M to get Module with full path
 *    $M must work fine in either module or mixed instance
 *
 * TODO test module function mixed into other module
 */
function test_$M(){
  create_mods();


  var m_t_MU   = Module.get("test.xp.core.ModuleUtil");
  var inst = m_t_MU.newInst();

  var m_sample  = Module.get("test.xp.Sample");
  var m_T2 = Module.get("test.T2");
  var m_1 = Module.get("test.other_1.ModA");
  var m_2 = Module.get("test.other_2.ModA");

  /* get module with only NAME */

  function _test_$M_Name_only(o){
    /* o may be module instance or mixed instance */

    assertEquals(o+"get required Module by NAME only",
      m_T2,
      o.$M_delegate(".T2"));

    assertError(o+"expect an error when get module with same name but different package", 
      function (){ o.$M_delegate(".ModA"); });

    assertUndefined(o+"get inexistent module with name ", 
      o.$M_delegate(".Inexistence"));

    assertError(o+"expect an error when parameter is not a string", 
      function (){ o.$M_delegate({}); });
  }

  _test_$M_Name_only(inst);
  _test_$M_Name_only(m_t_MU);

  /* get module with partial path */

  function _test_$M_Partial(o){
    assertEquals("get name with partial path from required Modules", 
      m_T2, 
      o.$M_delegate(".test.T2"));

    assertEquals("get name with partial path from required Modules : .other_1.ModA", 
      m_1, 
      o.$M_delegate(".other_1.ModA"));

    assertEquals("get name with partial path from required Modules : .other_2.ModA", 
      m_2, 
      o.$M_delegate(".other_2.ModA"));

    assertUndefined("get name with partial path from required Modules : .inexistence.ModA", 
      o.$M_delegate(".inexistence.ModA"));
  }

  _test_$M_Partial(inst);
  _test_$M_Partial(m_t_MU);
  

  /* get module with full path */

  function _test_$M_Full(o){
    assertEquals("get name with full path", 
      m_T2, 
      o.$M_delegate("test.T2"));

    assertUndefined("get name with full path but actully a partial path", 
      o.$M_delegate("other_1.ModA"));

    assertUndefined("get name with partial path from required Modules : .inexistence.ModA", 
      o.$M_delegate("inexistence.ModA"));
  }

  _test_$M_Full(inst);
  _test_$M_Full(m_t_MU);
}

/**
 * mix method use $M to find module.
 * mix's parameter could be module name or module instance 
 */
function test_mix(){
  create_mods();

  /* debugger; */
  var sm = new Module ("test.TestMix", ["net.xp.core.ModuleUtil"], {});
  sm.mix("test.T2");

  Module.require(["test.T2"]);
  var sm2 = new Module ("test.TestMix2", ["net.xp.core.ModuleUtil"], {});
  sm2.mix(".T2");

  var sm3 = new Module ("test.TestMix3", ["net.xp.core.ModuleUtil"], {});
  sm3.mix(Module.get("test.T2"));

  var methodTest = Module.get("test.T2").test;

  assertEquals("inst.test method is mixed from test.T2",
    methodTest,
    sm.test);

  assertEquals("inst.test method is mixed from test.T2 with Name only",
    methodTest,
    sm2.test);

  assertEquals("inst.test method is mixed from test.T2 Module",
    methodTest,
    sm3.test);

  assertNotError("just ignore if no parameter passed", 
    function (){ sm3.mix(); })
}

function test_required_module_method(){
  create_mods();
  var mod = Module.get("test.xp.Sample");

  var mixedMod = Module.get("test.xp.SampleMore");
  Module.get("net.xp.core.ModuleUtil").mixTo(mixedMod);
  var ins = mixedMod.newInst();

  assertTrue("mixedMod.sampleMethod",
    mixedMod.sampleMethod != null);

  assertTrue("ins.sampleMethod not null",
    ins.sampleMethod != null);

  assertEquals("ins.sampleMethod",
    mixedMod.sampleMethod,
    ins.sampleMethod);

  try{
    var tempModule = new Module("temp", [
	"test.xp.Sample"
      ], {
	novf : function (){}
      });
    fail("expect an error but not");
  }catch (e){}
}

function test_mix2o(){
  /* test mixing module to normal object */

  new Module("TestMixToObj", 
    ["net.xp.core.ModuleUtil"], 
    function ($t, $n, $p, $g, $r, $c){return {
	getValue : function (){
	  this[$n] = this[$n] || {};
	  this[$n].value = this[$n].value || 0;
	  return ++this[$n].value;
	}, 
	getValueSimple : function (){
	  this[$n].value = this[$n].value || 0;
	  return ++this[$n].value;
	}
      }});

  var m = new Module("TestMixToOjbChild", 
    ["TestMixToObj"], 
    function ($t, $n, $p, $g, $r, $c){
      return {
	getAnotherValue : function (){
	  this[$n].value = this[$n].value || 0;
	  return ++this[$n].value;
	}
      }});

  var o = {}, p = {}, q = {getValue : function (){}};

  var or = m.mix2o(o);
  var pr = m.mix2o(p);


  assertError("mix2o cant be called from normal object, but from module only", 
    function (){o.mix2o(p)});

  assertError("cant override normal object's properties", 
    function (){m.mix2o(q)});


  /* test return value */
  assertEquals("mix2o returns the original module for o", 
    m, 
    or);

  assertEquals("mix2o returns the original module for p", 
    m, 
    pr);

  /* test mixed methods */
  assertEquals("mixed method from ModuleUtil",
    m.$M, 
    o.$M);

  assertEquals("mixed method from ModuleUtil",
    m.getValue, 
    o.getValue);

  /* test auto added module-relative variable (this.xxx) */
  assertNotError("this[blabla] already exists", 
    function (){ o.getValueSimple(); });

  assertEquals("increase value", 
    2, 
    o.getValue());

  assertEquals("values from different module will not be confused", 
    1, 
    o.getAnotherValue());


  assertEquals("increase value for p", 
    1, 
    p.getValue());

  assertNotEquals("values from different object will not be confused", 
    o.getValue(), 
    p.getValue());
}
