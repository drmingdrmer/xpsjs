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
  ins.loadModule("test.loadSeq.L1");
}

/**
 * test dependence & initialize sequence
 */

function test_load_and_init_order(){

  var m = Module;

  assertEquals("load sequence", 
    "test.loadSeq.L1, test.loadSeq.L2a, test.loadSeq.L2b, test.loadSeq.L3, ", 
    m.seq);

  assertEquals("init sequence", 
    "test.loadSeq.L3, test.loadSeq.L2a, test.loadSeq.L2b, test.loadSeq.L1, ", 
    m.int);
}
