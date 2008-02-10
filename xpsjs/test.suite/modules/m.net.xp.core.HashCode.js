
function test_module(){
  var m = Module.get("net.xp.core.HashCode");

  var inst = {};
  m.copyTo(inst);

  var hcode = inst.hashCode();

  assertTrue("hash a is not null",
    hcode != null);

  var inst2 = {};
  m.copyTo(inst2);
  var hCode2 = inst2.hashCode();

  assertTrue("hash b is not null",
    hCode2 != null);

  assertNotEquals("hashcodes are not equal",
    hcode,
    hCode2);

  var hCodeAgain = inst.hashCode();

  assertEquals("inst get the same hash",
    hcode,
    hCodeAgain);
}


