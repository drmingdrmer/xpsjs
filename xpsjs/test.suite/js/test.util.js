function bind(o, f, p){
  return function (){
    return f.apply(o, p);
  }
}

function assertError(msg, f){
  try {
    f();
    fail(msg);
  } catch (err) { }
}

function assertNotError(msg, f){
  try {
    f();
  } catch (err) { 
    fail(msg);
  }
}
