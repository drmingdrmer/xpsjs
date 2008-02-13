/**
 * 
 */
function test_each(){
  var m = Module.get("net.xp.core.Enumerable");

}


/**
 */
 function test_embadEach(){

}



function test_Array_each(){
  var apm = new Module("ArrayPatch", ["net.xp.core.Enumerable"], function ($this, $name) {
      return {
	getEnumArray : function (){
	  return this;
	}
      }
    });

  apm.mixTo(Array);

  var rsltA = [], rsltB = [];
  [1,2,3].each(function (e,i){
      rsltA.push(i);
      rsltB.push(e);
    });

  assertEquals("result.a : ", "0,1,2", rsltA.join());
  assertEquals("result.b : ", "1,2,3", rsltB.join());

  //test find
  assertEquals("find 2 from [1,2,3]", 2, [1,2,3,4].findBy(function(e) {
	return e == 2 ? e : null;
      }));
  assertEquals("find 2 from [1,2,3] by eval find", 2, [1,2,3,4].findBy("e == 2 ? e :null"));
  assertEquals("find 2 from [1,2,3] by eval find with params", 2, [1,2,3,4].findBy("e == a[1] ? e :null",2));

  assertEquals("find 2 from [1,2,3] by eval findOn", 2, [1,2,3,4].find("== 2"));

  assertTrue("find none", null == [].find("==2"));
  assertEquals("find all as no condition", 1, [1,2,3].find());


  //test find all
  assertEquals("find all larger than 2", "3,4", [1,2,3,4].findAllBy("e > 2 ? e : null").join());
  assertEquals("find all but no result", "", [1,2,3,4].findAll("> 100").join());


  //test pluck
  var t = [{x:5},{x:6}];
  assertEquals("get property x", "5,6", t.pluck("x").join());
  assertEquals("get property x", "", t.pluck("y").join());

  //test all
  assertEquals("get all element", "1,2,3", [1,2,3].all().join());


}

function test_Object_each(){
  var apm = new Module("ObjectPatch", ["net.xp.core.Enumerable"], function ($this, $name) {
      return {
      }
    });

  apm.mixTo(Object);

  var rsltA = [], rsltB = 0;
  var o = {x:4,y:2,z:3};
  o.each(function (e,i){
      rsltA.push(i);
      rsltB += e;
    });

  assertEquals("result.a : ", "0,1,2", rsltA.join());
  assertEquals("result.b : ", 9, rsltB);
}
