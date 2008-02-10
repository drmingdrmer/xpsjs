/**
 */
var test_onload_only_form_var = 0;
var test_trigger_time;
var onloadEventFlag = false;
var onloadEventFlag2 = false;

function setUp()    { }
function tearDown() { }


function setUpPage() {

  /* test for onload-only form */
  function test_job () { test_onload_only_form_var=1; }
  var ins = new ModuleLoader(test_job);
  ins.onload[0](); /* hack : the first onload callback */
  ModuleLoader.instance = null; /* refresh hack */

  /* test standard config form */
  var ins = new ModuleLoader({
      path : {
	js : "../test.suite/core/for.loader"
      }, 
      onLoadFinish : function() {
	test_trigger_time = !!$str/* defined in test/stringUtil.js */;   /* onload must execute after loaded js */
	setUpPageStatus = "complete";
      }
    });

  ins.addOnloadEvent(function (){
      onloadEventFlag = true;
    });
  ins.addOnloadEvent(function (){
      onloadEventFlag2 = true;
    });

  ins.loadJS("test/stringUtil.js");
  ins.loadJS("test/stringUtil.js", "$module");	  /* load to another window */
}

function test_load_time(){
  assertTrue("loaded script executed before onload", 
    test_trigger_time);
}

function test_loader_basic() {
  var ins = ModuleLoader.instance;

  assertEquals("onload-only form must be ok",
    1,
    test_onload_only_form_var);

  assertNotNull("Module Loader loaded in to window", 
    window.ModuleLoader);

  assertEquals("only 1 loader instance", 
    new ModuleLoader(), 
    ModuleLoader.instance);

  assertNotNull("loader.config object",
    ins.config);

  var cfg = ins.config;     
  assertNotNull("loader.path",
    cfg.path);

  var path = ins.path;
  assertNotNull("loader.path.base",
    path.base);

  assertEquals("default path : loader.path.js",
    "../test.suite/core/for.loader",
    path.js);

  assertEquals("default path : loader.path.module",
    "../test.suite/core/for.loader/modules",
    path.module);   
}

function test_loader_method(){
  var ins = ModuleLoader.instance;
  assertEquals("loader.method = loadJS2","function",typeof(ins.loadJS));
  assertEquals("loader.method = loadJS","function",typeof(ins.loadJS));
  assertEquals("loader.method = loadModule","function",typeof(ins.loadModule));
  assertEquals("loader.method = loadModules","function",typeof(ins.loadModules));
}

function test_load(){
  var ins = ModuleLoader.instance;

  assertNotNull("stringutil",
    $str);

  assertNotNull("stringUtil in another window", 
    $module.$str);

  assertFalse("separate name space", 
    $str == $module.$str);
}

function test_onload_event(){
  assertTrue("additional onload event invoked", 
    onloadEventFlag);

  assertTrue("another additional onload event invoked", 
    onloadEventFlag2);
}
