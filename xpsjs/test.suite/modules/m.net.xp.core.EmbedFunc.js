function func_template(a, b, c){

  /* var t = func_embed(1, 2); */
  var t = func_embed();

  return t;
}

function func_embed(a, b, c){
  return a + b;
  return;
}


var t = 1;
function test_embed_func(){
  var m = Module.get("net.xp.core.EmbedFunc");

  var nf = m.embedFunc(func_template, func_embed);

  var v = nf(1, 2, 3);

  assertEquals("evaluate created function", 
    3, 
    v);


  nf = function (a, b){
    quitHere:
    while(1){
      var _v = a + b;
      break quitHere;
    }

    return _v;
  }

  var t0 = new Date().getTime();
  for (var i= 0; i < 50000; ++i){
    func_embed();
  }
  var t1 = new Date().getTime();
  for (var i= 0; i < 50000; ++i){
    nf();
  }
  var t2 = new Date().getTime();
  console.log(t1-t0, t2-t1);
  console.log(t);

}
