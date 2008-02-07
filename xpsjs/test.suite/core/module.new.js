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
}

function test_module_new_param_3(){
  
  try {
    new Module();
    fail("0 parameters cause an error");
  } catch (err) { }

  try {
    new Module("");
    fail("1 parameters cause an error");
  } catch (err) { }

  try {
    new Module("", "");
    fail("2 parameters cause an error");
  } catch (err) { }

  try {
    new Module("Test", "", {}, "something");
  } catch (err) { 
    fail("parameters other than the first 3 should be omit");
  }
}

function test_moduel_new_name(){

  try {
    new Module(1, "", {});
    fail("expect an error when name is not an string");
  } catch (err) { }

  try {
    new Module("Test2", null, {});
  } catch (err){
    fail("no error raising when mixing mods is null");
  }

  try {
    new Module("Test3", {}, {});
    fail("expect an error when mixing mods are not an string or array ");
  } catch (err) { }


  /* the 3rd param could be anything now. no test */

}

/* hash or function  */
function test_module_method_creator(){
  var o = {
    pro : 3,
    str : "xp",
    fun : function (){ }

  };

  var x = new Module("Test5", "", o);

  assertUndefined("no num property taken into module", 
    x.pro);

  assertUndefined("no string property taken into module", 
    x.str);

  assertEquals("only function taken in", 
    o.fun, 
    x.fun);


  var $t, $n, $p, $m, obj;
  function creator($this, $name, $pack, $mod){
    /* check parameters */
    $t = $this;
    $n = $name;
    $p = $pack;
    $m = $mod;

    return obj = {
      pro : 3,
      str : "xp",
      fun : function (){ } 
    };
  }

  var y = new Module("test.Test6", "", creator);

  assertEquals("parameter $this", 
    y, 
    $t);

  assertEquals("parameter $name", 
    "test.Test6", 
    $n);

  assertEquals("parameter $pack", 
    "test", 
    $p);

  assertEquals("parameter $mod", 
    Module, 
    $m);


  assertUndefined("y:no num property taken into module", 
    y.pro);

  assertUndefined("y:no string property taken into module", 
    y.str);

  assertEquals("y:only function taken in", 
    obj.fun, 
    y.fun);
}
