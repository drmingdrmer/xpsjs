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

function test_module_static_members(){

  var ldr = ModuleLoader.instance;

  assertEquals("Module.unimpl is function", 
    "function", 
    typeof(Module.unimpl));

  assertEquals("Module.getHostWin", 
    window, 
    Module.getHostWin());


  assertEquals("Module.getHostDoc", 
    document, 
    Module.getHostDoc());

  assertEquals("Module.loader", 
    ldr, 
    Module.loader);

  assertEquals("module root win", 
    window.$module, 
    Module.moduleRoot);

  assertEquals("Module in current window", 
    window.Module, 
    window.$module.Module);
}

function testModule_isOverridable(){
  function ovA($overridable){};
  function ovB(a, b, c, $overridable){};
  function ovC(a, b, $overridable){}
  function novA(){
    var f = function ($overridable){};
  };
  function novB(a,b,c,s_$overridable){};
  function novC(a,b,c){};

  assertTrue("ovA is true",Module.isOverridable(ovA));
  assertTrue("ovB is true",Module.isOverridable(ovB));
  assertTrue("ovC is true",Module.isOverridable(ovC));

  assertFalse("novA is false",Module.isOverridable(novA));
  assertFalse("novB is false",Module.isOverridable(novB));
  assertFalse("novC is false",Module.isOverridable(novC));
}

function test_Module_assignModule(){
  var psuedoModule = {};

  Module.assignName("sample.xp.bla.Moo",
    psuedoModule);

  assertEquals("assign psuedo module", 
    psuedoModule, 
    Module.moduleRoot.sample.xp.bla.Moo);

  //error emit:
  try{
    Module.assignName("",{});
    fail("an error should be thrown when assign empty name");
  } catch (e){}

  try{
    Module.assignName(null,{});
    fail("an error should be thrown when assign null name");
  } catch (e){}


  var pm2 = {};
  Module.assignName(".xp..r",pm2);
  assertEquals("ugly name module assignment",
    pm2, 
    Module.moduleRoot.xp.r);
}

function test_module_get(){

  assertNull("getting illegal name result null",
    Module.get("xx.xx.xx"));

  assertNotNull("get test.xp.Empty",
    Module.get("test.xp.Empty"));

  assertNotNull("get test.xp.Required",
    Module.get("test.xp.Required"));

  assertNull("getting illegal name result null",
    Module.get("xx.xx.xx"));

  assertNotNull("Required.test",
    Module.get("test.xp.Required").test);
}

/**
 * TODO simplify this test
 */
function testModule_prototype_method(){
  window.$M = Module.get;


  var m = Module.get("test.xp.Empty");
  assertNotNull("$initialize", m.$initialize);
  assertNotNull("mixTo", m.mixTo);
  assertNotNull("compatableTo", m.compatableTo);
  assertNotNull("clz", m.clz);
  assertNotNull("newInst", m.newInst);

  //_$initialize
  assertTrue("test.xp.Sample inited", Module.initedSample);
}

function test_Module_check_init_status(){

}



