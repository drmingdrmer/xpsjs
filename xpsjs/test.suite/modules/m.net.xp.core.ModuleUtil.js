
var inited = false;
function create_mods(){
  if (inited) return;


  new Module("test.xp.core.ModuleUtil",
    [
      "net.xp.core.ModuleUtil"
    ],
    {
      $initialize : function (){
	Module.initedSample = true;
      },

      sampleMethod : function (){ },

      ovf : function ($overridable){ },

      novf : function (){ },

      $constructor : function (a, b, c){
	this.a = [a, b, c];
      }
    });

  new Module("test.xp.Sample",
    [], {
      $initialize : function (){
	Module.initedSample = true;
      },

      sampleMethod : function (){ },

      ovf : function ($overridable){ },

      novf : function (){ },

      $constructor : function (a, b, c){
	this.a = [a, b, c];
      }
    });

  new Module("test.xp.SampleMore",
    [
      "test.xp.Sample", 
      "test.xp.Empty"
    ], {
      ovf : function ($overridable){
	var more;
      }
    });

  new Module("test.T2", [
      /* "net.xp.core." */
    ],
    function ($this, $name){return {
	test : function (){ }
      }});

  inited = true;
}

function test_compatable(){
  create_mods();
  //compatable
  var clz = function (){

  }
  clz.prototype = {
    sampleMethod : function (){},
    ovf          : function ($overridable){},
    novf         : function (){}
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

function test_clz(){
  create_mods();
  //clz
  var sm = Module.get("test.xp.core.ModuleUtil");
  var sClz = sm.clz({m:5});
  var sIns = new sClz();
  assertEquals("eq to 5",
    5,
    sIns.m);
  assertEquals("prototype.sampleMethod",
    sm.sampleMethod,
    sClz.prototype.sampleMethod);

}

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

  var y = sm.newInst({a:5,
      b:3});
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

function test_$M(){
  create_mods();
  var sm = Module.get("test.xp.core.ModuleUtil");
  var inst = sm.newInst();

  var m = Module.get("test.xp.Sample");
  var mt = Module.get("test.T2");
  
  assertEquals("get Module by full name",
    m,
    inst.$M("test.xp.Sample"));

  assertEquals("get Module by short",
    mt,
    inst.$M("T2"));	

  try{
    inst.$M("ModuleUtil");
    fail("should throw an error 'cause 2 ModuleUtil Loaded")
  } catch (e){}


  try{
    var t = inst.$M("ModuleNotLoad");
    fail("should throw an error 'cause no Module with name 'ModuleNotLoad' Loaded")
  } catch (e){}

}

function test_mix(){
  create_mods();
  var sm = Module.get("test.xp.core.ModuleUtil");
  sm.mix("test.T2");
  var methodTest = Module.get("test.T2").test;

  assertEquals("inst.test method",
    methodTest,
    sm.test);
}

function test_requiredModuleMethod(){
  create_mods();
  var mod = Module.get("test.xp.Sample");

  var mixedMod = Module.get("test.xp.SampleMore");
  Module.get("net.xp.core.ModuleUtil").mixTo(mixedMod);
  var ins = mixedMod.newInst();

  assertTrue("sm.sampleMethod",
    mixedMod.sampleMethod != null);

  assertTrue("ins.sampleMethod not null",
    ins.sampleMethod != null);

  assertEquals("ins.sampleMethod",
    mixedMod.sampleMethod,
    ins.sampleMethod);

  try{
    var tempModule = new Module("temp",

      ["test.xp.Sample"],
      {
	novf : function (){}
      });
    fail("expect an error but not");
  }catch (e){}
}



