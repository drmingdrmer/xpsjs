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

function test_this_dot_module_vars(){
  var ma = new Module("TestA", [], function($t, $n, $p, $g){
      return {
	a_func : function (){
	  var t = this[$n];
	  t.x = t.x || 0;
	  t.x++;
	  return t.x;
	}
      }
    });

  var mb = new Module("TestB", ["TestA"], function($t, $n, $p, $g){
      return {
	b_func : function (){
	  var t = this[$n];
	  t.x = t.x || 0;
	  t.x++;
	  return t.x;
	}
      }
    });

  function Clz(){ }

  mb.mixTo(Clz);
  console.log(mb.b_func);

  var ins = new Clz();

  /* TODO more error check test */
  /* TODO more check on complicated hierarchy */
  Module.initVar(ins, mb);

  assertEquals("get ma.t", 
    1, 
    ins.a_func());

  assertEquals("get ma.t", 
    2, 
    ins.a_func());

  assertEquals("get mb.t", 
    1, 
    ins.b_func());

}
