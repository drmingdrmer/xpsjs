/**
 * test other js path & module path
 * test constructor parameter
 * TODO error check for constructor parameter
 */
/**
 * load js
 */
function setUp()    { }
function tearDown() { }


var generatedModulePath = "";

var errchk1 = {}; /* for check bad param for ModuleLoader */
var errchk2 = {}; /* for check bad param for ModuleLoader */

function setUpPage() {

  /**
   * test path generation
   */

  var ins = new ModuleLoader({
      path : {
	js : "abc"
      }});
  generatedModulePath = ins.path.module;

  ModuleLoader.instance = null; /* for later use of creating realy loader */


  var ins = new ModuleLoader();
  errchk1.hasPath = !!ins.path;
  errchk1.path_js = ins.path.js == "js";
  errchk1.path_mod = ins.path.module == "js/modules";

  ModuleLoader.instance = null; /* for later use of creating realy loader */

  var ins = new ModuleLoader(1);
  errchk2.hasPath = !!ins.path;
  errchk2.path_js = ins.path.js == "js";
  errchk2.path_mod = ins.path.module == "js/modules";

  ModuleLoader.instance = null; /* for later use of creating realy loader */

  /**
   * test other js path & module path 
   *
   *   use the file loader.other.path.vars.js  to test js path.
   *   use the file module.test/Test.module.js to test module path.
   */

  ins = new ModuleLoader({
      path : {
	js	: "../test.suite/core/for.loader",	  /* the default root is based on the ../../ of ModuleLoader.js' folder */
	module	: "../test.suite/core/for.loader/module.test"		  /* module folder is under js folder directly */
      }, 
      onLoadFinish : function() {
	setUpPageStatus = "complete";
      }
    });

  var ins = ModuleLoader.instance;

  ins.loadJS("loader.other.path.vars.js");
  ins.loadModule("Test");

}



function test_error_check() {
  var ldr = ModuleLoader.instance;

  assertTrue('generated default path for null parameter', 
    errchk1.hasPath);

  assertTrue('generated default js path for null parameter', 
    errchk1.path_js);

  assertTrue('generated default module path for null parameter', 
    errchk1.path_mod);


  assertTrue('generated default path for bad parameter', 
    errchk2.hasPath);

  assertTrue('generated default js path for bad parameter', 
    errchk2.path_js);

  assertTrue('generated default module path for bad parameter', 
    errchk2.path_mod);
}


function test_path_config() {

  var ldr = ModuleLoader.instance;

  assertEquals("auto generated path.module ", 
    "abc/modules", 
    generatedModulePath);

  assertEquals("config.path.js check", 
    "../test.suite/core/for.loader", 
    ldr.path.js);

  assertEquals("config.path.module check", 
    "../test.suite/core/for.loader/module.test", 
    ldr.path.module);
}

function test_load_from_other_path() {

  var ldr = ModuleLoader.instance;
  assertTrue("pseudo Module loaded", 
    ldr.$module.pseudoModule);

  assertTrue("pseudo ModuleConfig loaded", 
    ldr.$module.pseudoModuleConfig);

  assertTrue("load js from other fold", 
    test_loader /* define in loader.other.path.var.js */);

  assertTrue("load moduel from other fold", 
    ldr.$module.test_module_var);

}
