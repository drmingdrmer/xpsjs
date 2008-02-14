function func_template(a, b){
  return func_embed();
}

function tmpl_for(a, b){
  var x = 0;
  for (var i=0; i<10; ++i){
    x += embed_if(i, b);
  }

  return x;
}

function embed_simple(a, b){
  return a + b;
}

function embed_param(a, b){
  for (var i= 0; i < a; ++i){
    b += i;
  }
  return b;
}

function embed_if(a, b){
  if (a>5){
    return 4;
  } else {
    return 10;
  }
}

function embed_if_1_ret(a, b){
  if (a>5){
    b = 4;
  } else {
    b = 10;
  }
  return b;
}


/**
 * TODO test mutil return & single return;
 * TODO set invoking name
 */
function test_embed_func(){
  var m = Module.get("net.xp.core.EmbedFunc");

  var new_simp  = m.embedFunc(func_template, embed_simple, "func_embed");
  var new_param = m.embedFunc(func_template, embed_param , "func_embed");
  var new_if    = m.embedFunc(func_template, embed_if    , "func_embed");

  /* assertEquals("evaluate created function",  */
    /* embed_simple(1, 2),  */
    /* new_simp(1, 2)); */

  /* assertEquals("with parameter",  */
    /* embed_param(3, 4),  */
    /* new_param(3, 4)); */

  /* assertEquals("if ",  */
    /* embed_if(3, 4),  */
    /* new_if(3, 4)); */

  /* assertEquals("if ",  */
    /* embed_if(8, 4),  */
    /* new_if(8, 4)); */

  var new_for    = m.embedFunc(tmpl_for, embed_if_1_ret    , "embed_if");

  assertEquals("invoke with parameter ", 
    tmpl_for(8, 4), 
    new_for(8, 4));

  var t0 = new Date().getTime();
  for (var i= 0; i < 50000; ++i){
    tmpl_for();
  }
  var t1 = new Date().getTime();
  for (var i= 0; i < 50000; ++i){
    new_for();
  }
  var t2 = new Date().getTime();
  console.log(t1-t0, t2-t1);

}
