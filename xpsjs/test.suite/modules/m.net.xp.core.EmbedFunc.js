/**
 * TODO test mutil return & single return.
 * TODO set invoking name.
 * TODO test external reference.
 * TODO test no mass with same parameter names for template & embebed
 * TODO test multi embed point in template
 *
 * TODO test no param translation mode
 * TODO test no result return mode
 */

/********************************************************************************\ 
 * template functions.
 ********************************************************************************/ 
function tmpl_dele(a, b){
  return func_embed(a, b);
}

function tmpl_for(a, b){
  var x = 0;
  for (var i=0; i<10; ++i){
    x += embed_if(i, b);
  }

  return x;
}

function tmpl_if(a, b, femb){
  var x = femb(a, b);
  if (x < 5) {
    x = femb(a, b+5);
  } else if (x > 20) {
    x = femb(a, b-20);
  }

  return x;
}

function tmpl_param(a, b, femb){
  femb(a, b);
  return b;
}

/********************************************************************************\ 
 * functions to embed.
 ********************************************************************************/ 
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
 * test:
 *    parameter passing
 *    multi return
 */
function test_simple_delegate(){
  var m = Module.get("net.xp.core.EmbedFunc");

  var new_simp  = m.embedFunc(tmpl_dele, embed_simple, "func_embed");
  var new_param = m.embedFunc(tmpl_dele, embed_param , "func_embed");
  var new_if    = m.embedFunc(tmpl_dele, embed_if    , "func_embed");
  var new_if2   = m.embedFunc(tmpl_dele, embed_if    , "func_embed");

  assertEquals("evaluate created function using template parameters : a + b. ", 
    embed_simple(1, 2), 
    new_simp(1, 2));

  assertEquals("with parameter passed from template to embeded : a + b", 
    embed_param(3, 4), 
    new_param(3, 4));

  assertEquals("embeded with 2 return distinguished by if, test the 1st return", 
    embed_if(3, 4), 
    new_if(3, 4));

  assertEquals("embeded with 2 return distinguished by if, test the 2nd return", 
    embed_if(8, 4), 
    new_if(8, 4));

  assertEquals("cached new_if2", 
    new_if, 
    new_if2);

}

/**
 * embeded function in a for loop or if-else
 * test:
 *    mutil embed point
 *    parameter confusion
 */
function test_more(){
  var m = Module.get("net.xp.core.EmbedFunc");

  var new_for = m.embedFunc(tmpl_for, embed_if_1_ret, "embed_if");

  assertEquals("invoke with parameter ", 
    tmpl_for(8, 4), 
    new_for(8, 4));

  var new_mul = m.embedFunc(tmpl_if, embed_if_1_ret, "femb");

  assertEquals("multi embed points", 
    tmpl_if(5, 2, embed_if_1_ret), 
    new_mul(5, 2));

  assertEquals("multi embed points --2--", 
    tmpl_if(15, 2, embed_if_1_ret), 
    new_mul(15, 2));

  assertEquals("multi embed points --3--", 
    tmpl_if(25, 2, embed_if_1_ret), 
    new_mul(25, 2));

  var new_prm = m.embedFunc(tmpl_param, embed_if_1_ret, "femb");

  assertEquals("no parameter messive after embed", 
    tmpl_param(7, 2, embed_if_1_ret), 
    new_prm(7, 2));


  function change_param(a, b){
    b.x = 5;
  }

  var new_prm_obj = m.embedFunc(tmpl_param, change_param, "femb");

  assertEquals("no object parameter messive after embed", 
    tmpl_param(0, {x:1}, change_param).x, 
    new_prm_obj(0, {x:1}).x);

}

function test_macro_mode(){
  var m = Module.get("net.xp.core.EmbedFunc");

  function tmpl(){
    var re = 0;
    for (var i = 0; i<5; ++i){
      cal(i);
    }
    return re;
  }

  function cal(i){
    re = re + i * 2;
  }

  function target(){ 
    var re = 0;
    for (var i = 0; i<5; ++i){
      re = re + i * 2;
    }
    return re;
  }


  var new_f = m.embedFunc(tmpl, cal, "cal", true);

  assertEquals("embed function body only, no param, no return", 
    target(), 
    new_f());



}

function bench_mark(){
  /* var t0 = new Date().getTime(); */
  /* for (var i= 0; i < 50000; ++i){ */
    /* tmpl_for(); */
  /* } */
  /* var t1 = new Date().getTime(); */
  /* for (var i= 0; i < 50000; ++i){ */
    /* new_for(); */
  /* } */
  /* var t2 = new Date().getTime(); */
  /* console.log(t1-t0, t2-t1); */
}
