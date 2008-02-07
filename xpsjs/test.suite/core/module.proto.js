function setUp() { }
function tearDown() { }

function setUpPage() {
  var ins = new ModuleLoader({
      path : {
	module : "../test.suite/core/for.module/modules"
      }, 
      onLoadFinish : function() {
	setUpPageStatus = "complete";
      }});

  ins.loadModule("test.xp.Empty");//require test.xp.Required
  ins.loadModule("test.xp.Sample");
}

function test_unimplement(){
  var m = Module.get("test.xp.Required");
  var errMsg;
  try {
    m.some_unimpl();
  } catch (err) {
    errMsg = err.message; 
  }

  assertEvaluatesToTrue("unimpl is overridable", 
    m.some_unimpl);

  assertEvaluatesToTrue("error message has mod name",
    errMsg.indexOf(m._name) >= 0);

  assertEvaluatesToTrue("error message has method name",
    errMsg.indexOf("test") >= 0);
}

/**
 * the differences between module methods and Module's prototype methods.
 *  $initialize & $constructor
 */
function test_module_methods(){

  /* create 2 module for mixing work */
  var ma = new Module("ma", [], {
      $initialize : function (){}, 
      $constructor : function (){}, 
      funA : function (){} 
    });

  var m = Module.get("test.xp.Empty");

  assertNotEquals("different module with different $initialize", 
    ma.$initialize, 
    m.$initialize);

  assertNotEquals("different module with different $constructor", 
    ma.$constructor, 
    m.$constructor);


  assertNotEquals("module's $initialize is different from its prototype", 
    ma.$initialize, 
    Module.prototype.$initialize);

  assertNotEquals("module's $constructor is different from its prototype", 
    ma.$constructor, 
    Module.prototype.$constructor);

  /* test after mixing */
  ma.mixTo(m);

  assertNotEquals("doesnt mix $initialize", 
    m.$initialize, 
    ma.$initialize);

  assertNotEquals("doesnt mix $constructor", 
    m.$constructor, 
    ma.$constructor);




}


function test_module_mix_and_copy(){

  var ot = {};

  var mt = new Module("Mix_tar", [], {
    });

  var ms = new Module("Mix_src", [], {
      ms_met : function (){}
    });

  /* mix to module */
  ms.mixTo(mt);

  assertEquals("mix method to module", 
    mt.ms_met, 
    ms.ms_met);

  ms.mixTo(mt);

  assertEquals("mix method to module again", 
    mt.ms_met, 
    ms.ms_met);

  /* override method and mix again */
  mt.ms_met = function (){};

  try {
    ms.mixTo(mt);
    fail("mix an existed method must cause an error");
  } catch (err) { }


  /* mix to normal class function  */

  function SomeFunc(){};
  ms.mixTo(SomeFunc);

  var ins = new SomeFunc();

  assertEquals("mixed Class instance has module method", 
    ms.ms_met, 
    ins.ms_met);

  try {
    var obj = {};
    ms.mixTo(obj);
    fail("expect an error when mix to normal object");
  } catch (err) { }






}


/* TODO check module methods' existance */


/**
 * overridable methods, either by specifying parameter mark or by unimplement
 * it.
 *
 * methods' methods
 */
function test_Module_methods(){

  var m = Module.get("test.xp.Required");

  assertNotNull("required module is loaded", 
    m);

  var t = m.test;

  assertEquals("Required.test method is a function ", 
    "function", 
    typeof(t));

  /* test module method's method */
  to_test_mod_method(m.test       , "test"       , m, "test.xp.Required", false);
  to_test_mod_method(m.some_unimpl, "some_unimpl", m, "test.xp.Required", true);
}


function to_test_mod_method(met, name, mod, modName, ovr){
  assertEquals(modName + "." + name + ".isOverridable to test if this method can be overrided", 
    ovr, 
    met.isOverridable());

  assertEquals(modName + "." + name + ".getName to get method name", 
    name, 
    met.getName());

  assertEquals(modName + "." + name + ".getModule to get host Module", 
    mod, 
    met.getModule());

  assertEquals(modName + "." + name + ".getModName to get host Module name", 
    modName, 
    met.getModName());

  assertEquals(modName + "." + name + ".modName to get host Module name", 
    modName, 
    met.modName);

  assertTrue(modName + "." + name + ".isModMethod is always true", 
    met.isModMethod);
}


/**
 * TODO move to other place.
 */
function test_Module_prototype_method(){

  var m = Module.get("test.xp.Empty");
  var p = Module.prototype;

  assertEquals("$initialize",
    p.$initialize, 
    m.$initialize);

  assertEquals("$constructor",
    p.$constructor,
    m.$constructor);

  assertNotNull("mixTo", m.mixTo);
  assertNotNull("compatableTo", m.compatableTo);
  assertNotNull("clz", m.clz);
  assertNotNull("newInst", m.newInst);

  //_$initialize
  assertTrue("test.xp.Sample inited", Module.initedSample);
}

