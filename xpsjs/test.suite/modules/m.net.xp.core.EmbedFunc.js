function func_template(a, b, c){

  var t = func_embed(1, 2);

  return t;
}

function func_embed(a, b, c){
  return a + b;
}

function test_embed_func(){
  var m = Module.get("net.xp.core.EmbedFunc");

  var nf = m.embedFunc(func_template, func_embed);

  var v = nf(1, 2, 3);

  assertEquals("evaluate created function", 
    3, 
    v);
}
